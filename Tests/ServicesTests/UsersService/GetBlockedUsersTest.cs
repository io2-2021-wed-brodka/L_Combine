using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.UsersService
{
    [TestClass]
    public class GetBlockedUsersTest: BaseUsersTest
    {
        [TestInitialize]
        public void PrepareService() => CreateUsersService();

        [TestMethod]
        public void GetBlockedUsers_Success()
        {
            var blocked = new List<string>() { "1", "2", "5" };
            foreach (var b in blocked)
                service.BlockUser(b);

            var result = service.GetBlockedUsers();
            CollectionAssert.AreEqual(result.Select(u => u.Id).ToList(), blocked);

        }
    }
}
