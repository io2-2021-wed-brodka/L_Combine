using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class BikesService : Service, IBikesService
    {
        const int PerUserBikesLimit = 4;

        public BikesService(DataContext dbContext) : base(dbContext)
        {
        }

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
                throw new HttpResponseException("Bike not found", 404);

            if (bike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException("Bike is blocked", 422);

            if (bike.BikeStationID == null)
                throw new HttpResponseException("Bike already rented", 422);

            var reservation = dbContext.Reservations
                .Where(r => r.BikeID == bikeId && r.ExpireDate > DateTime.Now)
                .FirstOrDefault();
            if ((reservation != null && reservation.UserID != userId))
                throw new HttpResponseException("Bike already reserved", 422);

            if (bike.BikeStation?.State != ClassLibrary.BikeStationState.Working)
                throw new HttpResponseException("Bike station is blocked", 422);

            //Tutaj wg mnie należy dodać rodzaj odpowiedzi do specki. Na razie 406 wydaje się spełniać wymogi.
            if (dbContext.Rentals
                .Where(r => r.UserID == userId && r.EndDate == null)
                .Count() >= PerUserBikesLimit)
                throw new HttpResponseException($"Cannot rent a bike. You've already rented {PerUserBikesLimit} bikes.", 422);

            //Rower gotowy do wypożyczenia -> dopisanie wypożyczenia
            dbContext.Rentals.Add(new Rental()
            {
                BikeID = bike.ID,
                StartDate = DateTime.Now,
                UserID = userId,
            });
            bike.BikeStationID = null;
            //Jeśli rower był zarezerwowany to usuwsamy rezerwację
            if (reservation != null)
                dbContext.Reservations.Remove(reservation);
            dbContext.SaveChanges();

            User user = dbContext.Users.FirstOrDefault(u => u.ID == userId);

            return CreateBikeDTO(bike, user);
        }

        public BikeDTO AddBike(string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);
            if (dbContext.BikeStations
                .FirstOrDefault(bs => bs.ID == stationId) == null)
                throw new HttpResponseException("Station not found", 404);
            var bike = new Bike()
            {
                BikeStationID = stationId,
                State = ClassLibrary.BikeState.Working,
            };
            dbContext.Bikes.Add(bike);
            //W momencie SaceChanges bike ma przypisaną BikeStation
            dbContext.SaveChanges();
            return CreateBikeDTO(bike, null, false);
        }

        public void DeleteBike(string bikeIdString)
        {
            int bikeId = ParseBikeId(bikeIdString);

            Bike bike;
            if ((bike = dbContext.Bikes
                .FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);
            if (bike.State != ClassLibrary.BikeState.Blocked)
                throw new HttpResponseException("Bike not blocked", 422);
            dbContext.Remove(bike);
            dbContext.SaveChanges();
        }

        public BikeDTO BlockBike(string bikeIdString)
        {
            int bikeId = ParseBikeId(bikeIdString);

            Bike bike;
            if ((bike = dbContext.Bikes
                .Include(b => b.BikeStation).FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            if (bike.State == ClassLibrary.BikeState.Blocked)
                throw new HttpResponseException("Bike already blocked", 422);

            if (bike.BikeStationID == null)
                throw new HttpResponseException("Bike already rented", 422);

            var reservations = from r in dbContext.Reservations
                               where r.BikeID == bikeId
                               select r;
            dbContext.Reservations.RemoveRange(reservations);
            bike.State = ClassLibrary.BikeState.Blocked;
            dbContext.SaveChanges();
            //Bike ma przypisane BikeStation bo było Include
            return CreateBikeDTO(bike, null, false);
        }

        public void UnblockBike(string bikeIdString)
        {
            int bikeId = ParseBikeId(bikeIdString);

            Bike bike;
            if ((bike = dbContext.Bikes.FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            if (bike.State != ClassLibrary.BikeState.Blocked)
                throw new HttpResponseException("Bike not blocked", 422);

            bike.State = ClassLibrary.BikeState.Working;
            dbContext.SaveChanges();
        }
    }
}
