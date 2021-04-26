using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class RentBike: BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException), "Bike is blocked")]
        public void BlockedBike_Failure()
        {
            string userId = "1";
            string bikeId = "5";

            service.RentBike(userId, bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException), "Bike not found")]
        public void BikeNotFound_Failure()
        {
            string userId = "1";
            string bikeId = "1337";

            service.RentBike(userId, bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException), "Bike already rented")]
        public void BikeRented_Failure()
        {
            string userId = "1";
            string bikeId = "7";

            service.RentBike(userId, bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException), "Bike already reserved")]
        public void BikeReserved_Failure()
        {
            string userId = "1";
            string bikeId = "7";
            string stationId = "3";
            ReserveBike(bikeId, stationId, userId);

            service.RentBike(userId, bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException), "Bike station is blocked")]
        public void StationBlocked_Failure()
        {
            string userId = "1";
            string bikeId = "6";

            service.RentBike(userId, bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException), "Cannot rent a bike. You've already rented 4 bikes.")]
        public void BikeLimit_Failure()
        {
            string userId = "3";
            string bikeId = "1";

            service.RentBike(userId, bikeId);

            Assert.Fail();
        }

        [TestMethod]
        public void FreeBike_Success()
        {
            string userId = "1";
            string bikeId = "1";

            service.RentBike(userId, bikeId);

            Assert.IsNotNull(dbContext.Rentals.Where(r => r.BikeID == int.Parse(bikeId) && r.EndDate == null && r.UserID == int.Parse(userId)).Count() == 0 ? null : (int?)1);
            Assert.IsNotNull(dbContext.Bikes.Where(b => b.ID == int.Parse(bikeId) && b.BikeStationID == null));
        }

        [TestMethod]
        public void ReservedBike_Success()
        {
            string userId = "1";
            string bikeId = "1";
            string stationId = "3";
            ReserveBike(bikeId, stationId, userId);

            service.RentBike(userId, bikeId);

            Assert.IsNotNull(dbContext.Rentals.Where(r => r.BikeID == int.Parse(bikeId) && r.EndDate == null && r.UserID == int.Parse(userId)).Count() == 0 ? null : (int?)1);
            Assert.IsNotNull(dbContext.Bikes.Where(b => b.ID == int.Parse(bikeId) && b.BikeStationID == null));
        }


    }
}
