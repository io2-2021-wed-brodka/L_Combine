using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.UsersService
{
    [TestClass]
    public class BlockUser : BaseUsersTest
    {
        [TestInitialize]
        public void PrepareService() => CreateUsersService();

        [TestMethod]
        public void BlockUser_Success()
        {
            int id = 1;
            service.BlockUser(id.ToString());

            var user = dbContext.Users.FirstOrDefault(u => u.ID == id);
            Assert.IsTrue(user.Blocked);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "User not found")]
        public void BlockUser_InvalidUserId()
        {
            int id = -1;
            service.BlockUser(id.ToString());
            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "User already blocked")]
        public void BlockUser_AlreadyBlocked()
        {
            int id = 1;
            service.BlockUser(id.ToString());
            service.BlockUser(id.ToString());
            Assert.Fail();
        }

    }
}
