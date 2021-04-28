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
    public class ReservationsService : Service, IReservationsService
    {
        const int PerUserReservationsLimit = 3;

        [ActivatorUtilitiesConstructor]
        public ReservationsService(DataContext dbContext) : base(dbContext)
        {
        }

        public ReservationsService(TestDataContext dbContext) : base(dbContext)
        {
        }

        //[TEST]
        public void CancelReservation(string userIdString, string bikeIdString)
        {
            int userId = ParseUserId(userIdString);
            int bikeId = ParseBikeId(bikeIdString);

            Bike reservedBike;
            if ((reservedBike = dbContext
                .Bikes
                .FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            var reservation = dbContext.Reservations
                .Where(r => r.BikeID == bikeId && r.ExpireDate > DateTime.Now)
                .FirstOrDefault();

            if (reservation == null)
                throw new HttpResponseException("Bike is not reserved", 422);

            if (reservation.UserID != userId)
                throw new HttpResponseException("Bike is reserved by another user", 422);

            dbContext.Reservations.Remove(reservation);

            dbContext.SaveChanges();
        }

        public IEnumerable<ReservationDTO> GetReservations(string userIdString)
        {
            int userId = ParseUserId(userIdString);

            return dbContext.Reservations
                .Where(r => r.ExpireDate > DateTime.Now && r.UserID == userId)
                .Include(r => r.BikeStation)
                .ToList()
                .Select(r => CreateReservationDTO(r));
        }

        //[TEST]
        public ReservationDTO ReserveBike(string userIdString, string bikeIdString)
        {
            int bikeId = ParseBikeId(bikeIdString);
            int userId = ParseUserId(userIdString);

            Bike reservedBike;
            //To jest dramat - trzeba dodac chaina aby wywalic sciane ifow
            if ((reservedBike = dbContext
                .Bikes.Include(b => b.BikeStation)
                .FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            //Tu poprawiłem bardzo ważną rzecz
            if (reservedBike.BikeStation == null)
                throw new HttpResponseException("Bike already rented", 422);

            if (reservedBike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException("Bike is blocked", 422);

            bool isReserved = dbContext.Reservations
                .Where(r => r.ExpireDate > DateTime.Now && r.BikeID == bikeId).Any();

            if (isReserved)
                throw new HttpResponseException("Bike already reserved", 422);

            //Dodałem warunek niżej bardzo ważny! Czytajmy speckę uważnie!
            if (reservedBike.BikeStation.State != ClassLibrary.BikeStationState.Working)
                throw new HttpResponseException("Bike station is blocked", 422);

            var userActiveReservationsCount = dbContext.Reservations
                                          .Where(r => r.ExpireDate > DateTime.Now && r.UserID == userId).Count();

            if (userActiveReservationsCount >= PerUserReservationsLimit)
                throw new HttpResponseException($"You have already reserved {PerUserReservationsLimit} bikes", 422);

            User user = dbContext.Users.FirstOrDefault(u => u.ID == userId);
            Reservation reservation = new Reservation(user, reservedBike);

            dbContext.Reservations.Add(reservation);
            //BARDZO WAŻNE! Po SaveChanges reservation.BikeStation nie jest już null!
            dbContext.SaveChanges();

            //Mogę to wywołać, po reservation.BikeStation != null!!!!!
            return CreateReservationDTO(reservation);
        }
    }
}
