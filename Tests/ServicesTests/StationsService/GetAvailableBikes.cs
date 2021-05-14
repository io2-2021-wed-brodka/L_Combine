using ClassLibrary;
using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class GetAvailableBikes: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Station not found")]
        public void StationNotFound_Failure()
        {
            string stationId = "1337";
            string role = Role.User;

            service.GetAvailableBikes(stationId, role);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Only tech and admin can list bikes at blocked station")]
        public void BlockedStation_User_Failure()
        {
            string stationId = "4";
            string role = Role.User;

            service.GetAvailableBikes(stationId, role);

            Assert.Fail();
        }

        [TestMethod]
        public void BlockedStation_Admin_Success()
        {
            string stationId = "4";
            string role = Role.Admin;

            var bikes = service.GetAvailableBikes(stationId, role);

            CollectionAssert.AreEqual(bikes.Select(u => u.Id).ToList(), new[] { "6" });
        }

        [TestMethod]
        public void WorkingStation_User_Success()
        {
            string stationId = "1";
            string role = Role.User;

            var bikes = service.GetAvailableBikes(stationId, role);

            CollectionAssert.AreEqual(bikes.Select(u => u.Id).ToList(), new[] { "4", "11" });
        }

        [TestMethod]
        public void WorkingStation_ReservedBikeShouldNotBeAvailable()
        {
            string stationId = "1";
            string role = Role.User;
            dbContext.Reservations.Add(
                new BackendAPI.Models.Reservation()
                {
                    BikeID = 4,
                    UserID = 3,
                    BikeStationID = 1,
                    ReservationDate = DateTime.Now,
                    ExpireDate = DateTime.Now.AddMinutes(30)
                });
            dbContext.SaveChanges();

            var bikes = service.GetAvailableBikes(stationId, role);

            CollectionAssert.AreEqual(bikes.Select(u => u.Id).ToList(), new[] { "11" });
        }

        [TestMethod]
        public void WorkingStation_Tech_Success()
        {
            string stationId = "1";
            string role = Role.Tech;

            var bikes = service.GetAvailableBikes(stationId, role);

            CollectionAssert.AreEqual(bikes.Select(u => u.Id).ToList(), new[] { "4", "11" });
        }
    }
}
