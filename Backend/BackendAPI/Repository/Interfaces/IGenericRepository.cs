using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public interface IGenericRepository<T>//TODO: do rozważenia where T is CoreComponent
    {
        IList<T> Get();
        T Update(T component);
        T GetByID(int ID);
        bool Insert(T component);
        bool Delete(int ID);
        void SaveChanges();
    }
}
