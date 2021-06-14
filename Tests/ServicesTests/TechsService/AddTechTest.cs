using ClassLibrary;
using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.TechsService
{
    [TestClass]
    public class AddTechTest : BaseTechsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateTechsService();

        [TestMethod]
        public void AddTech_Success()
        {
            string login = "nowy123";
            string password = "12345";

            var result = service.AddTech(login, password);
            int techId = int.Parse(result.Id);
            Assert.IsTrue(techId > 0);
            Assert.AreEqual(result.Name, login);
            Assert.AreEqual(Role.Tech, dbContext.Users.Find(techId).Role);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Dany login istnieje już w bazie!")]
        public void AddTech_RepeatedLogin()
        {
            string login = "login1";
            string password = "12345";

            var result = service.AddTech(login, password);
        }
    }
}
