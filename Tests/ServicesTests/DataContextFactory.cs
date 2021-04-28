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
                .Options;

            TestDataContext dbContext = new TestDataContext(dbOptions);

            //Zaoranie bazy
            dbContext.Database.EnsureDeleted();

            //utowrzenie bazy z danymi zdefiniowanych w konfiguracji modelu
            dbContext.Database.EnsureCreated();

            dbContext.SaveChanges();
            return dbContext;
        }
    }
}
