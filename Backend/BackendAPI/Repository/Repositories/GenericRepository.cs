﻿using BackendAPI.Data;
using BackendAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T>
    {
        protected DataContext dbContext;

        public GenericRepository()
        { }

        public GenericRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public bool Delete(string ID)
        {
            throw new NotImplementedException();
        }

        public IList<T> Get()
        {
            throw new NotImplementedException();
        }

        public T GetByID(string ID)
        {
            throw new NotImplementedException();
        }

        public bool Insert(T component)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            dbContext.SaveChanges();
        }

        public T Update(T component)
        {
            throw new NotImplementedException();
        }
    }
}
