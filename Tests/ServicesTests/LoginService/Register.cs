using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.LoginService
{
    [TestClass]
    public class Register : BaseLoginTest
    {
        [TestInitialize]
        public void PrepareService() => CreateLoginService();

        [TestMethod]
        public void Register_Success()
        {
            var result = service.Register("loginnowy", "pass");
            Assert.IsTrue(!string.IsNullOrEmpty(result.Token));
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Dany login istnieje już w bazie!")]
        public void Register_RepeatedLogin()
        {
            var result = service.Register("login1", "pass");

            Assert.Fail();
        }
    }
}
