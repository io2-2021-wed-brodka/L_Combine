using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class DeleteBike: BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException), "Bike is blocked")]
        public void BlockedBike_Failure()
        {
            string userId = "1";
            string bikeId = "5";

            service.RentBike(userId, bikeId);

            Assert.Fail();
        }
    }
}
