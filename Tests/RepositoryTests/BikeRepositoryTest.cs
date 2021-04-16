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
    public class BikeRepositoryTest
    {
        private BikeRepository bikeRepo;
        private RentalRepository rentalRepo;
        private UserRepository userRepo;
        private TestDataContext dbContext;

        //Czyscimy dane testowanej tabeli
        private void ClearData()
        {
            dbContext.Bikes.RemoveRange(dbContext.Bikes);
            dbContext.SaveChanges();
        }

        [TestInitialize]
        public void InitRepository()
        {
            //Tworzyzmy baze danych identyczna jak produkcyjna, tylko ze w pamieci
            var options = new DbContextOptionsBuilder<CommonDataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

            dbContext = new TestDataContext(options);
            ClearData();
            bikeRepo = new BikeRepository(dbContext);
            rentalRepo = new RentalRepository(dbContext);
            var jwtOptions = Options.Create(new JwtSettings() { Secret = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" });
            userRepo = new UserRepository(dbContext, jwtOptions);
        }

        //Umieszczenie roweru w tabeli poza repository
        private int InsertBike()
        {
            Bike test = new Bike()
            {
                BikeStationID = 1,
                State = ClassLibrary.BikeState.Working
            };

            dbContext.Bikes.Add(test);
            dbContext.SaveChanges();
            return test.ID;
        }

        [TestMethod]
        public void TestInsert()
        {

            bikeRepo.Insert(new Bike()
            {
                BikeStationID = 1,
                State = ClassLibrary.BikeState.Working
            });
            dbContext.SaveChanges();

            var result = dbContext.Bikes.First(b => b.BikeStationID == 1);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestGet()
        {
            InsertBike();

            var result = bikeRepo.Get();

            Assert.AreEqual(result.Count(), 1);
        }

        [TestMethod]
        public void TestGetById()
        {
            int id = InsertBike();

            var result = bikeRepo.GetByID(id);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestDelete()
        {
            int id = InsertBike();

            bikeRepo.Delete(id);
            dbContext.SaveChanges();

            var result = dbContext.Bikes.Count();
            Assert.AreEqual(result, 0);
        }

        private int InsertUser()
        {
            User test;
            using (var stringHash = new StringHash())
            {
                test = new User()
                {
                    Name = "Jan",
                    LastName = "Dzban",
                    Login = "password",
                    PasswordHash = stringHash.GetHash("login")
                };
            }

            dbContext.Users.Add(test);
            dbContext.SaveChanges();
            return test.ID;
        }

        [TestMethod]
        public void GetUserTest_NoRentalAssociated()
        {
            int id = InsertBike();
            int userId = InsertUser();
            rentalRepo.Insert(
                new Rental()
                {
                    BikeID = 2,
                    EndDate = DateTime.Now,
                    StartDate = DateTime.Now.Subtract(new TimeSpan(0, 20, 0)),
                    UserID = userId
                });
            //dbContext.SaveChanges();
            var bike = bikeRepo.GetByID(id);
            var result = userRepo.GetUser(bike);
            Assert.IsNull(result);
        }

        [TestMethod]
        public void GetUserTest_RentalAssociatedOutdated()
        {
            int id = InsertBike();
            int userId = InsertUser();
            rentalRepo.Insert(
                new Rental()
                {
                    BikeID = id,
                    EndDate = DateTime.Now,
                    StartDate = DateTime.Now.Subtract(new TimeSpan(0, 20, 0)),
                    UserID = userId
                });
            dbContext.SaveChanges();
            var bike = bikeRepo.GetByID(id);
            var result = userRepo.GetUser(bike);
            Assert.IsNull(result);
        }

        [TestMethod]
        public void GetUserTest_RentalAssociatedActive()
        {
            int id = InsertBike();
            int userId = InsertUser();
            rentalRepo.Insert(
                new Rental()
                {
                    BikeID = id,
                    EndDate = null,
                    StartDate = DateTime.Now.Subtract(new TimeSpan(0, 20, 0)),
                    UserID = userId
                });
            dbContext.SaveChanges();
            var bike = bikeRepo.GetByID(id);
            var result = userRepo.GetUser(bike);
            Assert.IsNotNull(result);
        }
    }
}
