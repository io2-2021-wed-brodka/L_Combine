using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.MalfunctionsService
{
    [TestClass]
    public class DeleteMalfunction : BaseMalfunctionsTest
    {
        [TestInitialize]
        public void PrepareService()
        {
            CreateMalfunctionsService();
            var malfunctions = new[]
{
                new BackendAPI.Models.Malfunction()
                {
                    BikeID = 1,
                    ReportingUserID = 1,
                    Description = "Hello",
                    DetectionDate = DateTime.Now.Subtract(TimeSpan.FromMinutes(30)),
                    State = ClassLibrary.MalfunctionState.NotFixed
                },
                new BackendAPI.Models.Malfunction()
                {
                    BikeID = 2,
                    ReportingUserID = 2,
                    Description = "Hello2",
                    DetectionDate = DateTime.Now.Subtract(TimeSpan.FromMinutes(70)),
                    State = ClassLibrary.MalfunctionState.NotFixed
                },
                new BackendAPI.Models.Malfunction()
                {
                    BikeID = 3,
                    ReportingUserID = 2,
                    Description = "",
                    DetectionDate = DateTime.Now.Subtract(TimeSpan.FromMinutes(70)),
                    State = ClassLibrary.MalfunctionState.Fixed
                }
            };
            dbContext.Malfunctions.AddRange(malfunctions);
            dbContext.SaveChanges();
        }

        [TestMethod]
        public void DeleteMalfunction_Success()
        {
            service.DeleteMalfunction("1");
            Assert.IsNull(dbContext.Malfunctions.Find(1));
            Assert.IsTrue(dbContext.Malfunctions.Count() == 2);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Malfunction not found")]
        public void DeleteMalfunction_InvalidId()
        {
            service.DeleteMalfunction("4");
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Malfunction not found")]
        public void DeleteMalfunction_NonNumericId()
        {
            service.DeleteMalfunction("4a");
        }
    }
}
