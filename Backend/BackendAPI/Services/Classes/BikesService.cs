using BackendAPI.Data;
using BackendAPI.Helpers.DTOFactories;
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
    public class BikesService : IBikesService
    {
        const int PerUserBikesLimit = 4;
        readonly DataContext dbContext;
        readonly IBikeDTOFactory bikeDTOFactory;

        public BikesService(DataContext dbContext,
            IBikeDTOFactory bikeDTOFactory)
        {
            this.dbContext = dbContext;
            this.bikeDTOFactory = bikeDTOFactory;
        }

        private int ParseUserId(string id) 
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("User not found", 404);
            return result;
        }

        public IEnumerable<BikeDTO> GetRentedBikes(string userIdString)
        {
            int userId = ParseUserId(userIdString);

            return dbContext.Rentals
                .Where(r => r.UserID == userId && r.EndDate == null)
                .Include(r => r.Bike)
                .ThenInclude(b => b.BikeStation)
                .Include(r => r.User)
                .Select(r => bikeDTOFactory.Create(r.Bike, r.User, false));
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
                throw new HttpResponseException("Bike is blocked");

            if (bike.BikeStation == null)
                throw new HttpResponseException("Bike already rented");

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

            return bikeDTOFactory.Create(bike, user);
        }
    }
}
