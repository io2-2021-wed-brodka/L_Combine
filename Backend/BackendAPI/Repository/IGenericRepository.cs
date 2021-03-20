using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository
{
    public interface IGenericRepository<T>//TODO: do rozważenia where T is CoreComponent
    {
        T Update(T component);
        T GetByID(string ID);
        bool Insert(T component);
        bool Delete(string ID);
        void SaveChanges();
    }
}
