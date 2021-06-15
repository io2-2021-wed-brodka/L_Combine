using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class DeleteBike: BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie znaleziono takiego roweru!")]
        public void BikeNotFound_Failure()
        {
            string bikeId = "1337";

            service.DeleteBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower nie jest zablokowany!")]
        public void DeleteWorkingBike_Failure()
        {
            string bikeId = "1";

            service.DeleteBike(bikeId);

            Assert.Fail();
        }

        [TestMethod]
        public void DeleteBlockedBike_Success()
        {
            string bikeId = "5";

            service.DeleteBike(bikeId);

            Assert.IsTrue(dbContext.Bikes.Where(b => b.ID == int.Parse(bikeId)).Count() == 0);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower nie jest zablokowany!")]
        public void DeleteServicedBike_Success()
        {
            string bikeId = "3";

            service.DeleteBike(bikeId);

            Assert.IsTrue(dbContext.Bikes.Where(b => b.ID == int.Parse(bikeId)).Count() == 0);
        }
    }
}
