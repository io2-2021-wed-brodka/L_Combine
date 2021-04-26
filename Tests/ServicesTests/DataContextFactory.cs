using BackendAPI.Data;
using BackendAPI.Models;
using ClassLibrary;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace ServicesTests
{ 
    class TestDataContextFactory
    {
        private static DbConnection CreateInMemoryDatabase()
        {
            var connection = new SqliteConnection("Filename=:memory:");

            connection.Open();

            return connection;
        }

        public static TestDataContext TestData()
        {

            var dbOptions = new DbContextOptionsBuilder<TestDataContext>()
                .UseSqlite(CreateInMemoryDatabase())
                //.UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            TestDataContext dbContext = new TestDataContext(dbOptions);

            //Zaoranie bazy
            dbContext.Database.EnsureDeleted();

            //utowrzenie bazy z danymi zdefiniowanych w konfiguracji modelu
            //Tych danych musi nie byc!!!!
            //Inczeej problem z autoincrementem
            dbContext.Database.EnsureCreated();

            //Tutaj byl problem, poniwewaz identyfikatory przesuwaly sie dalej (w sensie nie zaczynaly sie od 1)
            //ClearData(dbContext);
            /*AddUsers(dbContext);
            AddBikes(dbContext);
            AddBikeStations(dbContext);
            AddRentals(dbContext);
            AddReservations(dbContext);*/

            dbContext.SaveChanges();
            return dbContext;
        }

        private static void ClearData(TestDataContext dbContext)
        {
            foreach (User u in dbContext.Users)
                dbContext.Users.Remove(u);
            foreach (Bike b in dbContext.Bikes)
                dbContext.Bikes.Remove(b);
            foreach (BikeStation bs in dbContext.BikeStations)
                dbContext.BikeStations.Remove(bs);
            foreach (Rental r in dbContext.Rentals)
                dbContext.Rentals.Remove(r);
            foreach (Reservation r in dbContext.Reservations)
                dbContext.Reservations.Remove(r);
            dbContext.SaveChanges();
        }

        private static void AddUsers(TestDataContext dbContext)
        {
            /*foreach (User u in dbContext.Users)
                dbContext.Users.Remove(u);
            */

            using (StringHash stringHash = new StringHash())
            {
                dbContext.Users.AddRange(new User[]
                {
                    new User {Name = "ImieTestowe", LastName = "NazwiskoTestowe", Login = "login1", PasswordHash = stringHash.GetHash("pass1") },
                    new User {Name = "Imie2", LastName = "Nazwisko2", Login = "login2", PasswordHash = stringHash.GetHash("pass2") },
                    new User { Name = "Grzegorz", LastName = "Brzęczeszykiewicz", Login = "login3", PasswordHash = stringHash.GetHash("pass3") },
                    new User { Name = "Imie3", LastName = "Nazwisko3", Login = "login4", PasswordHash = stringHash.GetHash("pass4") },
                    new User { Name = "PostmanUserName", LastName = "PostmanUserLastName", Login = "PostmanUser", PasswordHash = stringHash.GetHash("PostmanUserPass") }
                });
            }
        }

        private static void AddBikes(TestDataContext dbContext)
        {
            /*foreach (Bike b in dbContext.Bikes)
                dbContext.Bikes.Remove(b);
            dbContext.SaveChanges();*/

            dbContext.Bikes.AddRange(new Bike[]
            {
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { State = ClassLibrary.BikeState.InService, BikeStationID = 3 },
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=1},
                new Bike { State=ClassLibrary.BikeState.Blocked, BikeStationID=1},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=4},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID = null},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID = null},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID = null},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID = null}
            });
        }

        private static void AddBikeStations(TestDataContext dbContext)
        {
            /*foreach (BikeStation bs in dbContext.BikeStations)
                dbContext.BikeStations.Remove(bs);
            dbContext.SaveChanges();*/

            dbContext.BikeStations.AddRange(new BikeStation[]
            {
                 new BikeStation { LocationName = "Warszawa Targowa", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { LocationName = "Warszawa Aleje Jerozolimskie", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { LocationName = "Warszawa PKiN", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { LocationName = "Warszawa Politechnika", State = ClassLibrary.BikeStationState.Blocked }
            });
        }

        private static void AddRentals(TestDataContext dbContext)
        {
            /*foreach (Rental r in dbContext.Rentals)
                dbContext.Rentals.Remove(r);
            dbContext.SaveChanges();*/

            dbContext.Rentals.AddRange(new Rental[]
            {
                new Rental { UserID=1, BikeID=1, StartDate=new DateTime(2021, 2, 20, 2, 0, 0), EndDate=new DateTime(2021, 2, 20, 2, 10, 15)},
                new Rental { UserID = 1, BikeID = 1, StartDate = new DateTime(2021, 2, 20, 3, 0, 0), EndDate= new DateTime(2021, 2, 20, 3, 15, 15) },
                new Rental { UserID = 2, BikeID = 2, StartDate = new DateTime(2021, 3, 15, 12, 0, 0), EndDate = new DateTime(2021, 3, 15, 12, 28, 0) },
                new Rental { UserID = 3, BikeID = 3, StartDate = new DateTime(2021, 3, 18, 21, 20, 12), EndDate = new DateTime(2021, 3, 18, 21, 39, 18) },
                new Rental { UserID = 3, BikeID = 2, StartDate = new DateTime(2021, 3, 20, 12, 40, 34), EndDate = new DateTime(2021, 3, 20, 13, 0, 56)},
                new Rental { UserID = 3, BikeID = 7, StartDate = new DateTime(2021, 3, 26, 12, 48, 34), EndDate = null },
                new Rental { UserID = 3, BikeID = 8, StartDate = new DateTime(2021, 3, 26, 12, 48, 34), EndDate = null },
                new Rental { UserID = 3, BikeID = 9, StartDate = new DateTime(2021, 3, 26, 12, 48, 34), EndDate = null },
                new Rental { UserID = 3, BikeID = 10, StartDate = new DateTime(2021, 3, 26, 12, 48, 34), EndDate = null }
            });
        }

        private static void AddReservations(TestDataContext dbContext)
        {
            /*foreach (Reservation r in dbContext.Reservations)
                dbContext.Reservations.Remove(r);
            dbContext.SaveChanges();*/

            //Tu na razie nic
        }
    }
}
