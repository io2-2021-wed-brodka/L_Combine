using BackendAPI.Data;
using BackendAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public abstract class GenericRepository<T> : IGenericRepository<T>
    {
        protected DataContext dbContext;

        public GenericRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public abstract bool Delete(int ID);

        public abstract IList<T> Get();

        public abstract T GetByID(int ID);

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

        public abstract T Update(T component);
    }
}
