using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.ReservationsService
{
    [TestClass]
    public class GetReservations : BaseReservationsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateReservationsService();

        [TestMethod]
        public void GetReservations_Success()
        {
            var reservations = new List<string>() { "1", "2", "4" };
            var userId = "1";

            foreach (var r in reservations)
                service.ReserveBike(userId, r);

            var result = service.GetReservations(userId);
            CollectionAssert.AreEqual(result.Select(r => r.Id).ToList(), reservations);
        }
    }
}
