using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.ReservationsService
{
    [TestClass]
    public class CancelReservation : BaseReservationsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateReservationsService();

        [TestMethod]
        public void CancelReservation_Success()
        {
            int bikeId = 1;
            int userId = 4;

            service.ReserveBike(userId.ToString(), bikeId.ToString());
            service.CancelReservation(userId.ToString(), bikeId.ToString());

            var result = dbContext.Reservations
                .FirstOrDefault(r => r.UserID == userId);
            Assert.IsNull(result);
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie znaleziono takiego roweru!")]
        public void CancelReservation_InvalidBike()
        {
            service.CancelReservation("1", "12345");
            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower nie jest zarezerwowany!")]
        public void CancelReservation_NotReservedBike()
        {
            service.CancelReservation("1", "1");
            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower jest już zarezerwowany przez innego użytkownika!")]
        public void CancelReservation_ReservedByOtherUser()
        {
            service.ReserveBike("1", "1");
            service.CancelReservation("2", "1");
            Assert.Fail();
        }
    }
}
