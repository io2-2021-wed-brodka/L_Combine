using ClassLibrary.DTO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.StationsService
{
    [TestClass]
    public class AddStation: BaseStationTest
    {
        [TestInitialize]
        public void PrepareService() => CreateStationService();

        [TestMethod]
        public void CreateUniqueName_Success()
        {
            string name = "Granda";

            var station = service.AddStation(name);

            Assert.IsTrue(station.Name == name);
            Assert.IsTrue(station.ActiveBikesCount == 0);
            Assert.IsTrue(station.Status == StationStatusDTO.Active);
        }

        //TODO: [TODO]
        /// <summary>
        /// Tak na pewno ma być, że mozna dodać stację o takiej samej nazwie?
        /// </summary>
        [TestMethod]
        public void CreateExistingName_Success()
        {
            string name = "Warszawa PKiN";

            var station = service.AddStation(name);

            Assert.IsTrue(station.Name == name);
            Assert.IsTrue(station.ActiveBikesCount == 0);
            Assert.IsTrue(station.Status == StationStatusDTO.Active);
        }
    }
}
