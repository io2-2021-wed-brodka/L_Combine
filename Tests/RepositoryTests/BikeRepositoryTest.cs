﻿using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;

namespace RepositoryTests
{
    [TestClass]
    public class BikeRepositoryTest
    {
        private BikeRepository bikeRepo;
        private DataContext dbContext;

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
            var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

            dbContext = new DataContext(options);
            ClearData();
            bikeRepo = new BikeRepository(dbContext);
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

        [TestMethod]
        public void UpdateTest()
        {
            int id = InsertBike();

            bikeRepo.Update(new Bike()
            {
                ID = id,
                BikeStationID = 6215671,
                State = ClassLibrary.BikeState.InService
            });
            dbContext.SaveChanges();

            var modified = dbContext.Bikes.First(bike => bike.ID == id);
            var result = modified.BikeStationID == 6215671 && modified.State == ClassLibrary.BikeState.InService;
            Assert.IsTrue(result);
        }
    }
}