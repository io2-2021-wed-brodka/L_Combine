using ClassLibrary;
using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.LoginService
{
    [TestClass]
    public class Login :BaseLoginTest
    {
        [TestInitialize]
        public void PrepareService() => CreateLoginService();

        [TestMethod]
        public void Login_Success()
        {
            var result = service.Login("login1", "pass1");
            Assert.IsTrue(result.Role == "user"
                && !string.IsNullOrEmpty(result.Token));
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Bad credentials")]
        public void Login_InvalidCredentials()
        {
            var result = service.Login("login1", "pass");

            Assert.Fail();
        }
    }
}
