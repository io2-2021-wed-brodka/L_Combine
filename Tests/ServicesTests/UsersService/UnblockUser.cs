using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.UsersService
{
    [TestClass]
    public class UnblockUser: BaseUsersTest
    {
        [TestInitialize]
        public void PrepareService() => CreateUsersService();

        [TestMethod]
        public void UnblockUser_Success()
        {
            int id = 1;
            service.BlockUser(id.ToString());

            service.UnblockUser(id.ToString());
            var user = dbContext.Users.FirstOrDefault(u => u.ID == id);
            Assert.IsFalse(user.Blocked);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "User not found")]
        public void UnblockUser_InvalidUserId()
        {
            int id = 500;

            service.UnblockUser(id.ToString());
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "User not blocked")]
        public void UnblockUser_UnblockUnblocked()
        {
            int id = 1;

            service.UnblockUser(id.ToString());
        }
    }
}
