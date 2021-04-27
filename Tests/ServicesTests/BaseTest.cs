using BackendAPI.Data;
using System;
using ClassLibrary.Exceptions;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BackendAPI.Models;

namespace ServicesTests
{
    abstract public class BaseTest
    {
        protected TestDataContext dbContext;

        protected TestDataContext GetContext()
        {
            dbContext = TestDataContextFactory.TestData();
            return dbContext;
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
