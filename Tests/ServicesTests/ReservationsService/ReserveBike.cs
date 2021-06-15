using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesTests.ReservationsService
{
    [TestClass]
    public class ReserveBike : BaseReservationsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateReservationsService();

        [TestMethod]
        public void ReserveBike_Success()
        {
            var userId = 1;
            var bikeId = 4;

            var result = service.ReserveBike(userId.ToString(), bikeId.ToString());
            Assert.IsTrue(result.Id == bikeId.ToString());
        }

        [TestMethod]
        public void ReserveBike_DurationTime30Min()
        {
            var userId = 1;
            var bikeId = 4;

            var result = service.ReserveBike(userId.ToString(), bikeId.ToString());
            Assert.IsTrue(10 > Math.Abs((result.ReservedTill - result.ReservedAt.AddMinutes(30)).TotalSeconds));
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Nie znaleziono takiego roweru!")]
        public void ReserveBike_InvalidBike()
        {
            service.ReserveBike("1", "123456");
            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower jest zablokowany!")]
        public void ReserveBike_BlockedBike()
        {
            service.ReserveBike("1", "5");
            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Stacja jest zablokowana!")]
        public void ReserveBike_BlockedBikeStation()
        {
            service.ReserveBike("1", "6");
            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower jest już zarezerwowany!")]
        public void ReserveBike_AlreadyReserved()
        {
            service.ReserveBike("1", "4");

            service.ReserveBike("2", "4");

            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Rower jest już wypożyczony!")]
        public void ReserveBike_AlreadyRented()
        {
            dbContext.Rentals.Add(new BackendAPI.Models.Rental()
            {
                BikeID = 4,
                UserID = 2,
                StartDate = DateTime.Now,
                EndDate = null
            });
            var bike = dbContext.Bikes.FirstOrDefault(b => b.ID == 4);
            bike.BikeStationID = null;
            dbContext.SaveChanges();

            service.ReserveBike("1", "4");
            Assert.Fail();
        }

        [TestMethod]
        [ExpectedExceptionMessage(typeof(HttpResponseException), "Zarezerwowałeś już 3 rowerów! Nie możesz zarezerwować kolejnego!")]
        public void ReserveBike_Reserve4Bikes()
        {
            var reservations = new List<int>() { 1, 2, 4, 11 };
            foreach (var r in reservations)
                service.ReserveBike("1", r.ToString());

            Assert.Fail();
        }
    }
}
