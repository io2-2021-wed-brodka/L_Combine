using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class BlockStation: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie została odnaleziona!")]
        public void StationNotFound_Failure()
        {
            string stationId = "1337";

            service.BlockStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja jest już zablokowana!")]
        public void BlockedStation_Failure()
        {
            string stationId = "4";

            service.BlockStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        public void StationWithoutReservations_Success()
        {
            string stationId = "3";

            var station = service.BlockStation(stationId);

            Assert.IsTrue(station.Status == StationStatusDTO.Blocked);
        }

        [TestMethod]
        public void StationWithReservations_Success()
        {
            string stationId = "3";
            string userId = "1";
            string bikeId1 = "1";
            string bikeId2 = "2";
            string bikeId3 = "3";
            ReserveBike(bikeId1, stationId, userId);
            ReserveBike(bikeId2, stationId, userId);
            ReserveBike(bikeId3, stationId, userId);

            var station = service.BlockStation(stationId);

            Assert.IsTrue(station.Status == StationStatusDTO.Blocked);
            Assert.IsFalse(dbContext.Reservations.Any(r => r.BikeStationID == int.Parse(stationId)));
        }
    }
}
