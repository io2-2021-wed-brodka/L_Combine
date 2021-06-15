using ClassLibrary.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class AddBike: BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja nie została odnaleziona!")]
        public void StationNotFound_Failure()
        {
            string stationId = "1337";

            service.AddBike(stationId);

            Assert.Fail();
        }

        [TestMethod]
        public void AddBike_Success()
        {
            string stationId = "1";
            int startBikes = dbContext.BikeStations.Include(BikesService => BikesService.Bikes).Where(bs => bs.ID == int.Parse(stationId)).FirstOrDefault().Bikes.Count();
            
            service.AddBike(stationId);

            int afterCount = dbContext.BikeStations.Include(BikesService => BikesService.Bikes).Where(bs => bs.ID == int.Parse(stationId)).FirstOrDefault().Bikes.Count();
            Assert.IsTrue(startBikes + 1 == afterCount);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Ta stacja nie może mieć więcej rowerów!")]
        public void AddBike_MoreBikesThanBikesLimit()
        {
            string stationId = "7";
            service.AddBike(stationId);
        }
    }
}
