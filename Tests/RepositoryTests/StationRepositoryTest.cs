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
    public class StationRepositoryTest
    {
        private StationRepository stationRepo;
        private DataContext dbContext;

        //Czyscimy dane testowanej tabeli
        private void ClearData()
        {
            dbContext.BikeStations.RemoveRange(dbContext.BikeStations);
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
            stationRepo = new StationRepository(dbContext);
        }

        //Umieszczenie roweru w tabeli poza repository
        private int InsertStation()
        {
            BikeStation test = new BikeStation()
            {
                LocationName = "Siemens"
            };

            dbContext.BikeStations.Add(test);
            dbContext.SaveChanges();
            return test.ID;
        }

        [TestMethod]
        public void TestInsert()
        {
            stationRepo.Insert(new BikeStation()
            {
                LocationName = "Siemens"
            });
            dbContext.SaveChanges();

            var result = dbContext.BikeStations.First(s => s.LocationName == "Siemens");

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestGet()
        {
            InsertStation();

            var result = stationRepo.Get();

            Assert.AreEqual(result.Count(), 1);
        }

        [TestMethod]
        public void TestGetById()
        {
            int id = InsertStation();

            var result = stationRepo.GetByID(id);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestDelete()
        {
            int id = InsertStation();

            stationRepo.Delete(id);
            dbContext.SaveChanges();

            var result = dbContext.BikeStations.Count();
            Assert.AreEqual(result, 0);
        }

        [TestMethod]
        public void UpdateTest()
        {
            int id = InsertStation();

            stationRepo.Update(new BikeStation()
            {
                ID = id,
                LocationName = "Sydni"
            });
            dbContext.SaveChanges();

            var modified = dbContext.BikeStations.First(s => s.ID == id);
            var result = modified.LocationName == "Sydni";
            Assert.IsTrue(result);
        }
    }
}
