using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public delegate IList<T> IncludeData<T>(DbSet<T> data) where T : class;

    public interface IGenericRepository<T> where T : class
    {
        IList<T> Get(IncludeData<T> includeFilter = null);
        T GetByID(int ID, IncludeData<T> includeFilter = null);
        bool Insert(T component);
        bool Delete(int ID);
        void SaveChanges();
    }
}
