using BackendAPI.Data;
using BackendAPI.Models;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryTests
{
    class TestDataContextFactory
    {
        public static DataContext TestData()
        {
            var dbOptions = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

            DataContext dbContext = new DataContext(dbOptions);

            //Wsciekne sie po prostyu zaraz.  Zjakiegos powodu nie dalo sie dodawac nowych obiektow do bazy.
            //NIe potrafil ogarnac klucza glownego automatycznie.
            //Trzeba przerobic na sqlite z InMemory
            /*AddUsers(dbContext);
            AddBikes(dbContext);
            AddBikeStations(dbContext);
            AddRentals(dbContext);*/

            dbContext.SaveChanges();
            return dbContext;
        }

        private static void AddUsers(DataContext dbContext)
        {
            using (StringHash stringHash = new StringHash())
            {
                dbContext.Users.AddRange(new User[]
                {
                    new User { ID = 1, Name = "ImieTestowe", LastName = "NazwiskoTestowe", Login = "login1", PasswordHash = stringHash.GetHash("pass1") },
                    new User { ID = 2, Name = "Imie2", LastName = "Nazwisko2", Login = "login2", PasswordHash = stringHash.GetHash("pass2") },
                    new User { ID = 3, Name = "Grzegorz", LastName = "Brzęczeszykiewicz", Login = "login3", PasswordHash = stringHash.GetHash("pass3") },
                    new User { ID = 4, Name = "Imie3", LastName = "Nazwisko3", Login = "login4", PasswordHash = stringHash.GetHash("pass4") },
                    new User { ID = 5, Name = "PostmanUserName", LastName = "PostmanUserLastName", Login = "PostmanUser", PasswordHash = stringHash.GetHash("PostmanUserPass") }
                });
            }
        }

        private static void AddBikes(DataContext dbContext)
        {
            dbContext.Bikes.AddRange(new Bike[]
            {
                new Bike { ID=1, State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { ID=2, State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { ID = 3, State = ClassLibrary.BikeState.InService, BikeStationID = 3 },
                new Bike { ID = 4, State=ClassLibrary.BikeState.Working, BikeStationID=1},
                new Bike { ID=5, State=ClassLibrary.BikeState.Working, BikeStationID=1},
                new Bike { ID=6, State=ClassLibrary.BikeState.Working, BikeStationID=4},
                new Bike { ID=7, State=ClassLibrary.BikeState.Working, BikeStationID = 1}
            });
        }

        private static void AddBikeStations(DataContext dbContext)
        {
            dbContext.BikeStations.AddRange(new BikeStation[]
            {
                 new BikeStation { ID = 1, LocationName = "Warszawa Targowa", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 2, LocationName = "Warszawa Aleje Jerozolimskie", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 3, LocationName = "Warszawa PKiN", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 4, LocationName = "Warszawa Politechnika", State = ClassLibrary.BikeStationState.Blocked }
            });
        }

        private static void AddRentals(DataContext dbContext)
        {
            dbContext.Rentals.AddRange(new Rental[]
            {
                new Rental { ID=1, UserID=1, BikeID=1, StartDate=new DateTime(2021, 2, 20, 2, 0, 0), EndDate=new DateTime(2021, 2, 20, 2, 10, 15)},
                new Rental { ID = 2, UserID = 1, BikeID = 1, StartDate = new DateTime(2021, 2, 20, 3, 0, 0), EndDate= new DateTime(2021, 2, 20, 3, 15, 15) },
                new Rental { ID = 3, UserID = 2, BikeID = 2, StartDate = new DateTime(2021, 3, 15, 12, 0, 0), EndDate = new DateTime(2021, 3, 15, 12, 28, 0) },
                new Rental { ID = 4, UserID = 3, BikeID = 3, StartDate = new DateTime(2021, 3, 18, 21, 20, 12), EndDate = new DateTime(2021, 3, 18, 21, 39, 18) },
                new Rental { ID = 5, UserID = 3, BikeID = 2, StartDate = new DateTime(2021, 3, 20, 12, 40, 34), EndDate = new DateTime(2021, 3, 20, 13, 0, 56)}
            });
        }
    }
}
