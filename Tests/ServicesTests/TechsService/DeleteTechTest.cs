using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.TechsService
{
    [TestClass]
    public class DeleteTechTest : BaseTechsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateTechsService();

        [TestMethod]
        public void DeleteTech_Success()
        {
            var id = 6;

            service.DeleteTech(id.ToString());
            Assert.IsNull(dbContext.Users.Find(id));
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono danego techa!")]
        public void DeleteTech_InvalidId()
        {
            var id = 120;

            service.DeleteTech(id.ToString());
        }


        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono danego techa!")]
        public void DeleteTech_IdOfAdmin()
        {
            var id = 7;

            service.DeleteTech(id.ToString());
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie odnaleziono danego techa!")]
        public void DeleteTech_IdOfUser()
        {
            var id = 1;

            service.DeleteTech(id.ToString());
        }
    }
}
