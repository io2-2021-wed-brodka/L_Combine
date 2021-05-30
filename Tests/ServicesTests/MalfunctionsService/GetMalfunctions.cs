using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace ServicesTests.MalfunctionsService
{
    [TestClass]
    public class GetMalfunctions : BaseMalfunctionsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateMalfunctionsService();

        [TestMethod]
        public void GetNoMalfunctions_Success()
        {
            var result = service.GetMalfunctions();
            Assert.AreEqual(result.Count(), 0);
        }

        [TestMethod]
        public void GetMalfunctions_Success()
        {
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
                    BikeID = 2,
                    ReportingUserID = 2,
                    Description = "",
                    DetectionDate = DateTime.Now.Subtract(TimeSpan.FromMinutes(70)),
                    State = ClassLibrary.MalfunctionState.Fixed
                }
            };
            dbContext.Malfunctions.AddRange(malfunctions);
            dbContext.SaveChanges();

            var result = service.GetMalfunctions();
            Assert.AreEqual(result.Count(), malfunctions.Count());
            var test = result.ToList();
            for (int i=0; i<test.Count; i++)
            {
                Assert.AreEqual(test[i].BikeId, malfunctions[i].BikeID.ToString());
                Assert.AreEqual(test[i].Description, malfunctions[i].Description);
                Assert.AreEqual(test[i].ReportingUserId, malfunctions[i].ReportingUserID.ToString());
            }
        }
    }
}
