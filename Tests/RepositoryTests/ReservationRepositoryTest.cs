using BackendAPI.Data;
using BackendAPI.Helpers;
using BackendAPI.Models;
using BackendAPI.Repository.Repositories;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RepositoryTests
{
    [TestClass]
    public class ReservationRepositoryTest
    {
        private BikeRepository bikeRepo;
        /*private RentalRepository rentalRepo;
        private UserRepository userRepo;*/
        private ReservationRepository reservationRepo;
        private DataContext dbContext;

        //Czyscimy dane testowanej tabeli
        private void ClearData()
        {
            dbContext.Reservations.RemoveRange(dbContext.Reservations);
            dbContext.Bikes.RemoveRange(dbContext.Bikes);
            dbContext.SaveChanges();
        }

        [TestInitialize]
        public void InitRepository()
        {
            //Tworzyzmy baze danych identyczna jak produkcyjna, tylko ze w pamieci
            var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

            dbContext = new DataContext(options);
            ClearData();
            bikeRepo = new BikeRepository(dbContext);
            /*rentalRepo = new RentalRepository(dbContext);
            var jwtOptions = Options.Create(new JwtSettings() { Secret = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" });
            userRepo = new UserRepository(dbContext, jwtOptions);*/
            reservationRepo = new ReservationRepository(dbContext);
        }

        //Umieszczenie roweru w tabeli poza repository
        private int InsertReservation()
        {

            Reservation test = new Reservation(
                new User() { ID = 2 },
                new Bike() { ID = 3, BikeStationID = 4}
                );

            dbContext.Reservations.Add(test);
            dbContext.SaveChanges();
            return test.ID;
        }

        [TestMethod]
        public void TestInsert()
        {

            int id = InsertReservation();

            var result = dbContext.Reservations.
                First(r => r.ID == id);

            Assert.IsNotNull(result);
            Assert.AreEqual(4, result.BikeStationID);
            Assert.AreEqual(2, result.UserID);
            Assert.AreEqual(3, result.BikeID);
        }

        [TestMethod]
        public void TestGet()
        {
            int id = InsertReservation();

            var result = reservationRepo.Get();

            Assert.IsTrue(result.Where(r => r.ID == id).Count() == 1);
        }

        [TestMethod]
        public void TestGetById()
        {
            int id = InsertReservation();

            var result = reservationRepo.GetByID(id);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestDelete()
        {
            int id = InsertReservation();

            reservationRepo.Delete(id);
            dbContext.SaveChanges();

            var result = dbContext.Reservations.FirstOrDefault(r => r.ID == id);
            Assert.IsNull(result);
        }

        [TestMethod]
        public void TestMapToReservedList()
        {
            IList<Bike> bikes = new List<Bike>()
            {
                new Bike(){ID = 1, BikeStationID = 1},
                new Bike(){ID = 2, BikeStationID = 1},
                new Bike(){ID = 3, BikeStationID = 1},
                new Bike(){ID = 4, BikeStationID = 2 }
            };
            foreach (var b in bikes)
                bikeRepo.Insert(b);

            reservationRepo.Insert(
                new Reservation(new User() { ID = 1 },
                bikes[0]));
            reservationRepo.Insert(
                new Reservation(new User() { ID = 1 },
                bikes[2]));
            reservationRepo.SaveChanges();

            var result = reservationRepo.MapBikesToReservedList(bikes).ToList();
            CollectionAssert.AreEqual(result, new List<bool> { true, false, true, false });
        }

    }
}
