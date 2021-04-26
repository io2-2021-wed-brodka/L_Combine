using System;
using System.Collections.Generic;
using System.Text;
using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Classes;

namespace ServicesTests.BikesService
{
    public class BaseBikesTest: BaseTest
    {
        protected BackendAPI.Services.Classes.BikesService service;

        protected void CreateBikeService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.BikesService(dbContext);
        }

        protected void ReserveBike(string bikeId, string stationId, string userId)
        {
            dbContext.Reservations.Add(new Reservation()
            {
                BikeID = int.Parse(bikeId),
                BikeStationID = int.Parse(stationId),
                UserID = int.Parse(userId),
                ReservationDate = DateTime.Now.AddMinutes(-5),
                ExpireDate = DateTime.Now.AddMinutes(25)
            });
            dbContext.SaveChanges();
        }
    }
}
