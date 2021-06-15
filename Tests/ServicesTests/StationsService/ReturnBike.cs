using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class ReturnBike: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie została odnaleziona!")]
        public void StationNotFound_Failure()
        {
            string stationId = "1337";
            string userId = "3";
            string bikeId = "8";

            service.ReturnBike(userId, bikeId, stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie znaleziono takiego roweru!")]
        public void BikeNotFound_Failure()
        {
            string stationId = "1";
            string userId = "3";
            string bikeId = "1337";

            service.ReturnBike(userId, bikeId, stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja jest zablokowana!")]
        public void StationBlocked_Failure()
        {
            string stationId = "4";
            string userId = "3";
            string bikeId = "8";

            service.ReturnBike(userId, bikeId, stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower nie jest wypożyczony przez żadnego użytkownika!")]
        public void ReturnSomeoneElsesBike_Failure()
        {
            string stationId = "1";
            string userId = "1";
            string bikeId = "8";

            service.ReturnBike(userId, bikeId, stationId);

            Assert.Fail();
        }

        [TestMethod]
        public void ReturnBike_Success()
        {
            string stationId = "1";
            string userId = "3";
            string bikeId = "8";

            var bike = service.ReturnBike(userId, bikeId, stationId);

            Assert.IsNotNull(bike.Station);
            Assert.IsFalse(dbContext.Rentals.Any(r => r.BikeID == int.Parse(bikeId) && r.UserID == int.Parse(userId) && r.EndDate == null));
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja jest już pełna!")]
        public void ReturnBike_StationFull()
        {
            string stationId = "7";
            string userId = "3";
            string bikeId = "8";

            service.ReturnBike(userId, bikeId, stationId);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower nie jest wypożyczony przez żadnego użytkownika!")]
        public void ReturnBike_BikeNotRented()
        {
            string stationId = "5";
            string userId = "3";
            string bikeId = "1";

            service.ReturnBike(userId, bikeId, stationId);
        }
    }
}
