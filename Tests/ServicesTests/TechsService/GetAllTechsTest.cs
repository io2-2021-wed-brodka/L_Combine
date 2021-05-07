using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.TechsService
{
    [TestClass]
    public class GetAllTechsTest : BaseTechsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateTechsService();

        [TestMethod]
        public void GetAllTechs_Success()
        {
            var result = service.GetAllTechs();
            CollectionAssert.AreEqual(result.Select(u => u.Id).ToList(), new[] { "6", "8" });
        }
    }
}
