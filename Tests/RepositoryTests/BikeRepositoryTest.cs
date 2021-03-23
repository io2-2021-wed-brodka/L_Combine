using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepositoryTests
{
    [TestClass]
    class BikeRepositoryTest
    {
        private BikeRepository bikeRepo;
        private DataContext dbContext;


        [TestInitialize]
        public void InitRepository()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

            dbContext = new DataContext(options);
            bikeRepo = new BikeRepository(dbContext);
        }

        private void InsertBike()
        {
            dbContext.Bikes.Add(
                new Bike()
                {
                    BikeStation = new BikeStation(),
                    BikeStationID = 1,
                    ID = 2,
                    Rentals = new List<Rental>(),
                    State = ClassLibrary.BikeState.Working
                });
        }

        [TestMethod]
        public void TestInsert()
        {
            bikeRepo.Insert(new Bike()
            {
                BikeStation = new BikeStation(),
                BikeStationID = 1,
                ID = 2,
                Rentals = new List<Rental>(),
                State = ClassLibrary.BikeState.Working
            });

            var result = dbContext.Bikes.First(b => b.ID == 2 && b.BikeStationID == 1);

            Assert.IsNotNull(result);
        }

        public void TestGet()
        {
            InsertBike();

            var result = bikeRepo.Get();

            Assert.AreEqual(result.Count(), 1);
        }

        [TestMethod]
        public void TestGetById()
        {
            InsertBike();

            var result = bikeRepo.GetByID("2");

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestDelete()
        {
            InsertBike();

            bikeRepo.Delete("2");

            var result = dbContext.Bikes.Count();
            Assert.AreEqual(result, 0);
        }
    }
}
