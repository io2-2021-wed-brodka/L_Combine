using BackendAPI.Data;
using BackendAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BackendAPI.Repository.Repositories
{
    public abstract class GenericRepository<T> : IGenericRepository<T>
        where T : class
    {
        protected CommonDataContext dbContext;

        public GenericRepository(CommonDataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public abstract bool Delete(int ID);

        public abstract IList<T> Get(IncludeData<T> includeFilter = null);

        public abstract T GetByID(int ID, IncludeData<T> includeFilter = null);

        public abstract bool Insert(T component);

        public void SaveChanges()
        {
            try
            {
                dbContext.SaveChanges();
            }
            catch 
            {
                //[LOG]Zaloguj blad
                throw;
            }
        }
    }
}
