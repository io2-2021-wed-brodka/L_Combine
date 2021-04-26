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
    class DataContextFactory
    {
        private static DbConnection CreateInMemoryDatabase()
        {
            var connection = new SqliteConnection("Filename=:memory:");

            connection.Open();

            return connection;
        }

        public static DataContext TestData()
        {
            var dbOptions = new DbContextOptionsBuilder<DataContext>()
                //.UseSqlite(CreateInMemoryDatabase())
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            DataContext dbContext = new DataContext(dbOptions);

            AddUsers(dbContext);
            AddBikes(dbContext);
            AddBikeStations(dbContext);
            AddRentals(dbContext);
            AddReservations(dbContext);

            dbContext.SaveChanges();
            return dbContext;
        }

        private static void AddUsers(DataContext dbContext)
        {
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

        private static void AddBikes(DataContext dbContext)
        {
            dbContext.Bikes.AddRange(new Bike[]
            {
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { State = ClassLibrary.BikeState.InService, BikeStationID = 3 },
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=1},
                new Bike { State=ClassLibrary.BikeState.Blocked, BikeStationID=1},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID=4},
                new Bike { State=ClassLibrary.BikeState.Working, BikeStationID = 1}
            });
        }

        private static void AddBikeStations(DataContext dbContext)
        {
            dbContext.BikeStations.AddRange(new BikeStation[]
            {
                 new BikeStation { LocationName = "Warszawa Targowa", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { LocationName = "Warszawa Aleje Jerozolimskie", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { LocationName = "Warszawa PKiN", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { LocationName = "Warszawa Politechnika", State = ClassLibrary.BikeStationState.Blocked }
            });
        }

        private static void AddRentals(DataContext dbContext)
        {
            dbContext.Rentals.AddRange(new Rental[]
            {
                new Rental { UserID=1, BikeID=1, StartDate=new DateTime(2021, 2, 20, 2, 0, 0), EndDate=new DateTime(2021, 2, 20, 2, 10, 15)},
                new Rental { UserID = 1, BikeID = 1, StartDate = new DateTime(2021, 2, 20, 3, 0, 0), EndDate= new DateTime(2021, 2, 20, 3, 15, 15) },
                new Rental { UserID = 2, BikeID = 2, StartDate = new DateTime(2021, 3, 15, 12, 0, 0), EndDate = new DateTime(2021, 3, 15, 12, 28, 0) },
                new Rental { UserID = 3, BikeID = 3, StartDate = new DateTime(2021, 3, 18, 21, 20, 12), EndDate = new DateTime(2021, 3, 18, 21, 39, 18) },
                new Rental { UserID = 3, BikeID = 2, StartDate = new DateTime(2021, 3, 20, 12, 40, 34), EndDate = new DateTime(2021, 3, 20, 13, 0, 56)}
            });
        }

        private static void AddReservations(DataContext dbContext)
        {
            //Na razie brak rezerwacji
        }
    }
}
