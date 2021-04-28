using ClassLibrary.DTO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class GetBlockedStations: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        public void BlockedStations_Success()
        {
            var result = service.GetBlockedStations();

            Assert.IsTrue(result.Count() == 2);
            Assert.IsTrue(result.All(bs => bs.Status == StationStatusDTO.Blocked));
        }
    }
}
