//using BackendAPI.Data;
//using BackendAPI.Helpers;
//using BackendAPI.Models;
//using BackendAPI.Repository.Repositories;
//using ClassLibrary;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Options;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Cryptography;
//using System.Text;

//namespace RepositoryTests
//{
//    [TestClass]
//    public class UserRepositoryTest
//    {
//        private UserRepository userRepo;
//        private DataContext dbContext;

//        //Czyscimy dane testowanej tabeli
//        private void ClearData()
//        {
//            dbContext.Users.RemoveRange(dbContext.Users);
//            dbContext.SaveChanges();
//        }

//        [TestInitialize]
//        public void InitRepository()
//        {
//            //Tworzyzmy baze danych identyczna jak produkcyjna, tylko ze w pamieci
//            var dbOptions = new DbContextOptionsBuilder<DataContext>()
//            .UseInMemoryDatabase(databaseName: "TestDatabase")
//            .Options;

//            dbContext = new DataContext(dbOptions);
//            ClearData();

//            var jwtOptions = Options.Create(new JwtSettings() { Secret = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" });
//            userRepo = new UserRepository(dbContext, jwtOptions);
//        }

//        //Umieszczenie użytkownika w tabeli poza repository
//        private int InsertUser()
//        {
//            User test;
//            using (var stringHash = new StringHash())
//            {
//                test = new User()
//                {
//                    Name = "Jan",
//                    LastName = "Dzban",
//                    Login = "password",
//                    PasswordHash = stringHash.GetHash("login"),
//                    Role = Role.User
//                };
//            }

//            dbContext.Users.Add(test);
//            dbContext.SaveChanges();
//            return test.ID;
//        }

//        [TestMethod]
//        public void TestInsert()
//        {
//            userRepo.Insert(new User()
//            {
//                Name = "Jan",
//                LastName = "Dzban"
//            });
//            dbContext.SaveChanges();

//            var result = dbContext.Users.First(u => u.Name == "Jan" && u.LastName == "Dzban");

//            Assert.IsNotNull(result);
//        }

//        [TestMethod]
//        public void TestGet()
//        {
//            InsertUser();

//            var result = userRepo.Get();

//            Assert.AreEqual(result.Count(), 1);
//        }

//        [TestMethod]
//        public void TestGetById()
//        {
//            int id = InsertUser();

//            var result = userRepo.GetByID(id);

//            Assert.IsNotNull(result);
//        }

//        [TestMethod]
//        public void TestDelete()
//        {
//            int id = InsertUser();

//            userRepo.Delete(id);
//            dbContext.SaveChanges();

//            var result = dbContext.Users.Count();
//            Assert.AreEqual(result, 0);
//        }

//        [TestMethod]
//        public void UpdateTest()
//        {
//            int id = InsertUser();

//            userRepo.Update(new User()
//            {
//                ID = id,
//                Name = "Maria",
//                LastName = "Różalska"
//            });
//            dbContext.SaveChanges();

//            var modified = dbContext.Users.First(s => s.ID == id);
//            var result = modified.Name == "Maria" && modified.LastName == "Różalska";
//            Assert.IsTrue(result);
//        }

//        [TestMethod]
//        public void TestAuthenticateValidCredentials()
//        {
//            int id = InsertUser();
//            dbContext.SaveChanges();

//            var response = userRepo.Authenticate(
//                new AuthenticateRequest()
//                {
//                    Login = "password",
//                    Password = "login"
//                });
//            Assert.IsNotNull(response);
//        }

//        [TestMethod]
//        public void TestAuthenticateInvalidCredentials()
//        {
//            int id = InsertUser();
//            userRepo.SaveChanges();

//            var response = userRepo.Authenticate(
//                new AuthenticateRequest()
//                {
//                    Login = "password",
//                    Password = "logi"
//                });
//            Assert.IsNull(response);
//        }
//    }
//}
