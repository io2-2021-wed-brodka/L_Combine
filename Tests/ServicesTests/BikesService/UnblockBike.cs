using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class UnblockBike: BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Bike not found")]
        public void BikeNotFound_Failure()
        {
            string bikeId = "1337";

            service.UnblockBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Bike not blocked")]
        public void UnblockFreeBike_Failure()
        {
            string bikeId = "1";

            service.UnblockBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        public void UnblockBlockedBike_Success()
        {
            string bikeId = "5";

            service.UnblockBike(bikeId);

            Assert.IsTrue(dbContext.Bikes.Where(b => b.ID == int.Parse(bikeId)).FirstOrDefault().State == ClassLibrary.BikeState.Working);
        }
    }
}
