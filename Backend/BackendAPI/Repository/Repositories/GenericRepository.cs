using BackendAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T>
    {
        //TODO: database connection
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
            throw new NotImplementedException();
        }

        public T Update(T component)
        {
            throw new NotImplementedException();
        }
    }
}
