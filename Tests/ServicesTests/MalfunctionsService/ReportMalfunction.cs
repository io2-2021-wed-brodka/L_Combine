using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.MalfunctionsService
{
    [TestClass]
    public class ReportMalfunction : BaseMalfunctionsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateMalfunctionsService();

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower nie jest wypożyczony przez danego użytkownika!")]
        public void ReportMalfunction_NonRentedBike()
        {
            var userId = "1";
            var bikeId = "2";
            var description = "aaa";
            service.ReportMalfunction(userId, bikeId, description);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower nie jest wypożyczony przez danego użytkownika!")]
        public void ReportMalfunction_BikeRentedByOtherUser()
        {
            var userId = "1";
            var bikeId = "10";
            var description = "aaa";
            service.ReportMalfunction(userId, bikeId, description);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono Bike!")]
        public void ReportMalfunction_NotNumericBikeId()
        {
            var userId = "1";
            var bikeId = "aaa123";
            var description = "aaa";
            service.ReportMalfunction(userId, bikeId, description);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie znaleziono takiego roweru!")]
        public void ReportMalfunction_IvalidBikeId()
        {
            var userId = "1";
            var bikeId = "-1";
            var description = "aaa";
            service.ReportMalfunction(userId, bikeId, description);
        }

        [TestMethod]
        public void ReportMalfunction_Success()
        {
            var userId = "3";
            var bikeId = "10";
            var description = "aaa";
            var result = service.ReportMalfunction(userId, bikeId, description);
            Assert.AreEqual(result.ReportingUserId, userId);
            Assert.AreEqual(result.BikeId, bikeId);
            Assert.AreEqual(result.Description, description);
        }
    }
}
