using BackendAPI.Repository.Interfaces;
using BackendAPI.Repository.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace RepositoryTests
{
    [TestClass]
    public class GenericRepositoryTest
    {
        [TestMethod]
        public void TestConstructor()
        {
            IGenericRepository<int> repo = new GenericRepository<int>();

            Assert.IsNotNull(repo);
        }

        [TestMethod]
        public void TestGet()
        {
            IGenericRepository<int> repo = new GenericRepository<int>();

            Assert.ThrowsException< NotImplementedException>(()=>repo.Get());
        }

        [TestMethod]
        public void TestGetById()
        {
            IGenericRepository<int> repo = new GenericRepository<int>();

            Assert.ThrowsException<NotImplementedException>(() => repo.GetByID(""));
        }

        [TestMethod]
        public void TestDelete()
        {
            IGenericRepository<int> repo = new GenericRepository<int>();

            Assert.ThrowsException<NotImplementedException>(() => repo.Delete(""));
        }

        [TestMethod]
        public void TestSaveChanges()
        {
            IGenericRepository<int> repo = new GenericRepository<int>();

            Assert.ThrowsException<NotImplementedException>(() => repo.SaveChanges());
        }

        [TestMethod]
        public void TestUpdate()
        {
            IGenericRepository<int> repo = new GenericRepository<int>();

            Assert.ThrowsException<NotImplementedException>(() => repo.Update(1));
        }

        [TestMethod]
        public void TestInsert()
        {
            IGenericRepository<int> repo = new GenericRepository<int>();

            Assert.ThrowsException<NotImplementedException>(() => repo.Insert(2));
        }
    }
}
