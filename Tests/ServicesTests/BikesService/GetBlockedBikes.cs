using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using ClassLibrary.DTO;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class GetBlockedBikes : BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

        [TestMethod]
        public void GetBlockedBikes_Success()
        {
            var result = service.GetBlockedBikes();
            CollectionAssert.AreEqual(
                result.Select(b => b.Id).ToList(),
                new List<string>() { "5", "12" }
                );
            CollectionAssert.AreEqual(
                result.Select(b => b.Status).ToList(),
                new List<string>() { BikeStatusDTO.Blocked, BikeStatusDTO.Blocked }
                );

        }
    }
}
