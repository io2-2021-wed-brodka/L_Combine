using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public class UserRepository: GenericRepository<User>, IUserRepository
    {
        public UserRepository(DataContext dbContext) : base(dbContext)
        { }

        public new bool Delete(int ID)
        {
            User user = GetByID(ID);
            if (user == null)
                return false;
            dbContext.Users.Remove(user);
            return true;

        }

        public new IList<User> Get()
        {
            return dbContext.Users.ToList();
        }

        public new User GetByID(int ID)
        {
            return dbContext.Users.FirstOrDefault(b => b.ID == ID);
        }

        public new bool Insert(User component)
        {
            dbContext.Add(component);
            return true;
        }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new User Update(User component)
        {
            dbContext.Entry(GetByID(component.ID)).CurrentValues.SetValues(component);
            return component;
        }
    }
}
