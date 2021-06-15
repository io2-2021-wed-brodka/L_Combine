using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class GetStation: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie została odnaleziona!")]
        public void StationNotFound_Failure()
        {
            string stationId = "1337";

            service.GetStation(stationId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono stacji!")]
        public void GetStation_NonNumericId()
        {
            service.GetStation("4a");
        }

        [TestMethod]
        public void StationExists_Success()
        {
            string stationId = "3";

            var station = service.GetStation(stationId);

            Assert.IsNotNull(station);
        }
    }
}
