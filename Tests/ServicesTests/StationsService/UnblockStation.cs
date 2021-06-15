using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class UnblockStation: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie została odnaleziona!")]
        public void StationNotFound_Failure()
        {
            string stationId = "1337";

            service.UnblockStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie jest zablokowana!")]
        public void UnblockedStation_Failure()
        {
            string stationId = "1";

            service.UnblockStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        public void BlockedStation_Success()
        {
            string stationId = "4";

            service.UnblockStation(stationId);

            Assert.IsFalse(dbContext.BikeStations.Any(bs => bs.ID == int.Parse(stationId) && bs.State == ClassLibrary.BikeStationState.Blocked));
        }
    }
}
