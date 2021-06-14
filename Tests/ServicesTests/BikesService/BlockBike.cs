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
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie znaleziono takiego roweru!")]
        public void BikeNotFound_Failure()
        {
            string bikeId = "1337";

            service.BlockBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower jest już zablokowany!")]
        public void BlockBlockedBike_Failure()
        {
            string bikeId = "5";

            service.BlockBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower jest obecnie wypożyczony!")]
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
