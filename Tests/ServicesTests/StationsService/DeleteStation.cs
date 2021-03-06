using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class DeleteStation: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie została odnaleziona!")]
        public void StationNotFound_Failure()
        {
            string stationId = "1337";

            service.DeleteStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja posiada rowery!")]
        public void BlockedWithBikes_Failure()
        {
            string stationId = "4";

            service.DeleteStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie jest zablokowana!")]
        public void WorkingWithoutBikes_Failure()
        {
            string stationId = "5";

            service.DeleteStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie jest zablokowana!")]
        public void WorkingWithBikes_Failure()
        {
            string stationId = "1";

            service.DeleteStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        public void BlockedWithoutBikes_Success()
        {
            string stationId = "6";

            service.DeleteStation(stationId);

            Assert.IsFalse(dbContext.BikeStations.Any(bs => bs.ID == int.Parse(stationId)));
        }
    }
}
