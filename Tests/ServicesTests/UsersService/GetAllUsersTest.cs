using ClassLibrary.DTO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.UsersService
{
    [TestClass]
    public class GetAllUsersTest : BaseUsersTest
    {
        [TestInitialize]
        public void PrepareService() => CreateUsersService();

        [TestMethod]
        public void GetAllUsers_Success()
        {
            var result = service.GetAllUsers();
            CollectionAssert.AreEqual(result.Select(u => u.Id).ToList(), new [] { "1", "2", "3", "4", "5" });

        }
    }
}
