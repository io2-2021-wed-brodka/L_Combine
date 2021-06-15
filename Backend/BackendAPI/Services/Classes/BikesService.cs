using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class BikesService : Service, IBikesService
    {
        const int PerUserBikesLimit = 4;

        [ActivatorUtilitiesConstructor]
        public BikesService(DataContext dbContext) : base(dbContext)
        {
        }

        public BikesService(TestDataContext dbContext): base(dbContext)
        { }

        public IEnumerable<BikeDTO> GetBikesForAdmin()
        {
            return dbContext.Bikes
                .Include(b => b.BikeStation)
                .ToList()
                .Select(b => CreateBikeDTOWithReservedUser(b, 
                (from r in dbContext.Rentals.Include(r => r.User)
                 where r.EndDate == null && r.BikeID == b.ID
                 select r.User).FirstOrDefault()));
        }

        public IEnumerable<BikeDTO> GetRentedBikes(string userIdString)
        {
            int userId = ParseUserId(userIdString);

            return dbContext.Rentals
                .Where(r => r.UserID == userId && r.EndDate == null)
                .Include(r => r.Bike)
                .ThenInclude(b => b.BikeStation)
                .Include(r => r.User)
                .ToList()
                .Select(r => CreateBikeDTO(r.Bike, r.User, false));
        }

        public BikeDTO RentBike(string userIdString, string bikeIdString)
        {
            int userId = ParseUserId(userIdString);

            Bike bike;
            if (!int.TryParse(bikeIdString, out int bikeId) ||
                (bike = dbContext.Bikes
                .Include(b => b.BikeStation)
                .FirstOrDefault(b => b.ID == bikeId)
                ) == null)
                throw new HttpResponseException(ResMng.GetResource("BikeNotFound"), 404);

            if (bike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException(ResMng.GetResource("BikeIsBlocked"), 422);

            if (bike.BikeStationID == null)
                throw new HttpResponseException(ResMng.GetResource("BikeAlreadyRented"), 422);

            var reservation = dbContext.Reservations
                .Where(r => r.BikeID == bikeId && r.ExpireDate > DateTime.Now)
                .FirstOrDefault();
            if ((reservation != null && reservation.UserID != userId))
                throw new HttpResponseException(ResMng.GetResource("BikeAlreadyReserved"), 422);

            if (bike.BikeStation?.State != ClassLibrary.BikeStationState.Working)
                throw new HttpResponseException(ResMng.GetResource("BikeStationIsBlocked"), 422);

            if (dbContext.Rentals
                .Where(r => r.UserID == userId && r.EndDate == null)
                .Count() >= PerUserBikesLimit)
                throw new HttpResponseException(string.Format(ResMng.GetResource("BikeLimitReached"),PerUserBikesLimit), 422);

            //Rower gotowy do wypożyczenia -> dopisanie wypożyczenia
            dbContext.Rentals.Add(new Rental()
            {
                BikeID = bike.ID,
                StartDate = DateTime.Now,
                UserID = userId,
            });
            bike.BikeStationID = null;
            //Jeśli rower był zarezerwowany to usuwamy rezerwację
            if (reservation != null)
                dbContext.Reservations.Remove(reservation);
            dbContext.SaveChanges();

            User user = dbContext.Users.FirstOrDefault(u => u.ID == userId);

            return CreateBikeDTO(bike, user, false);
        }

        public BikeDTO AddBike(string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);
            BikeStation station;
            if ((station = dbContext.BikeStations.Include(bs => bs.Bikes)
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException(ResMng.GetResource("StationNotFound"), 404);
            if (station.Bikes.Count() >= station.BikesLimit)
                throw new HttpResponseException(ResMng.GetResource("StationBikeLimitReached"), 422);
            var bike = new Bike()
            {
                BikeStationID = stationId,
                State = ClassLibrary.BikeState.Working,
            };
            dbContext.Bikes.Add(bike);
            //W momencie SaveChanges bike ma przypisaną BikeStation
            dbContext.SaveChanges();
            return CreateNotRentedNotReservedBikeDTO(bike);
        }

        public void DeleteBike(string bikeIdString)
        {
            int bikeId = ParseBikeId(bikeIdString);

            Bike bike;
            if ((bike = dbContext.Bikes
                .FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException(ResMng.GetResource("BikeNotFound"), 404);
            if (bike.State != ClassLibrary.BikeState.Blocked)
                throw new HttpResponseException(ResMng.GetResource("BikeNotBlocked"), 422);
            dbContext.Remove(bike);
            dbContext.SaveChanges();
        }

        public BikeDTO BlockBike(string bikeIdString)
        {
            int bikeId = ParseBikeId(bikeIdString);

            Bike bike;
            if ((bike = dbContext.Bikes
                .Include(b => b.BikeStation).FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException(ResMng.GetResource("BikeNotFound"), 404);

            if (bike.State == ClassLibrary.BikeState.Blocked)
                throw new HttpResponseException(ResMng.GetResource("BikeAlreadyBlocked"), 422);

            if (bike.BikeStationID == null)
                throw new HttpResponseException(ResMng.GetResource("BikeCurrentlyRented"), 422);

            var reservations = from r in dbContext.Reservations
                               where r.BikeID == bikeId
                               select r;
            dbContext.Reservations.RemoveRange(reservations);
            bike.State = ClassLibrary.BikeState.Blocked;
            dbContext.SaveChanges();
            //Bike ma przypisane BikeStation bo było Include
            return CreateNotRentedNotReservedBikeDTO(bike);
        }

        public void UnblockBike(string bikeIdString)
        {
            int bikeId = ParseBikeId(bikeIdString);

            Bike bike;
            if ((bike = dbContext.Bikes.FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException(ResMng.GetResource("BikeNotFound"), 404);

            if (bike.State != ClassLibrary.BikeState.Blocked)
                throw new HttpResponseException(ResMng.GetResource("BikeNotBlocked"), 422);

            bike.State = ClassLibrary.BikeState.Working;
            dbContext.SaveChanges();
        }

        public IEnumerable<BikeDTO> GetBlockedBikes()
        {
            var bikes = dbContext.Bikes.Include(b => b.BikeStation)
                .Where(b => b.State == ClassLibrary.BikeState.Blocked).ToList();
            return bikes.Select(b => CreateNotRentedNotReservedBikeDTO(b));
        }
    }
}
