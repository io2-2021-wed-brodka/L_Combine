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
    public class RentalRepositoryTest
    {
        private RentalRepository rentalRepo;
        private DataContext dbContext;

        //Czyscimy dane testowanej tabeli
        private void ClearData()
        {
            dbContext.Rentals.RemoveRange(dbContext.Rentals);
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
            rentalRepo = new RentalRepository(dbContext);
        }

        //Umieszczenie roweru w tabeli poza repository
        private int InsertStation()
        {
            Rental test = new Rental()
            {
                BikeID = 2,
                StartDate = DateTime.Now,
                UserID = 2
            };

            dbContext.Rentals.Add(test);
            dbContext.SaveChanges();
            return test.ID;
        }

        [TestMethod]
        public void TestInsert()
        {
            DateTime date = DateTime.Now;

            rentalRepo.Insert(new Rental()
            {
                BikeID = 2,
                StartDate = date,
                UserID = 2
            });
            dbContext.SaveChanges();

            var result = dbContext.Rentals.First(r => r.BikeID == 2 && r.StartDate == date && r.UserID == 2 && r.EndDate == null);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestGet()
        {
            InsertStation();

            var result = rentalRepo.Get();

            Assert.AreEqual(result.Count(), 1);
        }

        [TestMethod]
        public void TestGetById()
        {
            int id = InsertStation();

            var result = rentalRepo.GetByID(id);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestDelete()
        {
            int id = InsertStation();

            rentalRepo.Delete(id);
            dbContext.SaveChanges();

            var result = dbContext.Rentals.Count();
            Assert.AreEqual(result, 0);
        }

        [TestMethod]
        public void UpdateTest()
        {
            int id = InsertStation();
            DateTime date = DateTime.Now;

            rentalRepo.Update(new Rental()
            {
                ID = id,
                EndDate = date,
                BikeID = 2,
            });
            dbContext.SaveChanges();

            var modified = dbContext.Rentals.First(r => r.ID == id);
            //Uwaga, Update bez ustawionego pola ustawia mu domyslną wartość! (tutaj UserID i StartDate)
            var result = modified.BikeID == 2 && modified.UserID == 0 && modified.EndDate == date && modified.StartDate == new DateTime();
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void FindActiveRentalTest_ExpectedNull()
        {
            rentalRepo.Insert(new Rental()
            {
                BikeID = 1,
                UserID = 2,
                EndDate = DateTime.Now,
                StartDate = DateTime.Now.Subtract(new TimeSpan(0, 5, 0))
            });
            dbContext.SaveChanges();
            var result = rentalRepo.FindActiveRental(1, 2);
            Assert.IsNull(result);
        }

        [TestMethod]
        public void FindActiveRentalTest_ExpectedNotNull()
        {
            rentalRepo.Insert(new Rental()
            {
                BikeID = 1,
                UserID = 2,
                EndDate = null,
                StartDate = DateTime.Now.Subtract(new TimeSpan(0, 5, 0))
            });
            dbContext.SaveChanges();
            var result = rentalRepo.FindActiveRental(1, 2);
            Assert.IsNotNull(result);
            Assert.IsTrue(result.BikeID == 1 && result.UserID == 2 && result.EndDate == null);
        }
    }
}
