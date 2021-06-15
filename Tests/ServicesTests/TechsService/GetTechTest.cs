using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.TechsService
{
    [TestClass]
    public class GetTechTest : BaseTechsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateTechsService();

        [TestMethod]
        public void GetTech_Success()
        {
            int id = 6;
            var result = service.GetTech(id.ToString());

            Assert.AreEqual(int.Parse(result.Id), id);
            Assert.AreEqual(result.Name, dbContext.Users.Find(id).Login);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono danego techa!")]
        public void GetTech_InvalidId()
        {
            int id = 120;
            var result = service.GetTech(id.ToString());
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono techa!")]
        public void GetTech_NonNumericId()
        {
            service.GetTech("4a");
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono danego techa!")]
        public void GetTech_IdOfAdmin()
        {
            int id = 7;
            var result = service.GetTech(id.ToString());
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono danego techa!")]
        public void GetTech_IdOfUser()
        {
            int id = 1;
            var result = service.GetTech(id.ToString());
        }
    }
}
