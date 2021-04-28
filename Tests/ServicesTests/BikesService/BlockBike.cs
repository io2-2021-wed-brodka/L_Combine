using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class BlockBike : BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Bike not found")]
        public void BikeNotFound_Failure()
        {
            string bikeId = "1337";

            service.BlockBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Bike already blocked")]
        public void BlockBlockedBike_Failure()
        {
            string bikeId = "5";

            service.BlockBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Bike is rented")]
        public void BlockRentedBike_Failure()
        {
            string bikeId = "7";

            service.BlockBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        public void BlockFreeBike_Success()
        {
            string bikeId = "1";

            service.BlockBike(bikeId);

            Assert.IsTrue(dbContext.Bikes.Where(b => b.ID == int.Parse(bikeId)).FirstOrDefault().State == ClassLibrary.BikeState.Blocked);
        }
    }
}
