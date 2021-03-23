using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;

namespace BackendAPI.Repository.Repositories
{
    public class BikeRepository : GenericRepository<Bike>, IBikeRepository
    {
        public BikeRepository(DataContext dbContext) : base(dbContext)
        { }

        public new bool Delete(string ID)
        {
            throw new NotImplementedException();
        }

        public new IList<Bike> Get()
        {
            return dbContext.Bikes.ToList();
        }

        public new Bike GetByID(string ID)
        {
            try
            {
                int id = int.Parse(ID);

                return dbContext.Bikes.First(b => b.ID == id);
            }
            catch
            {
                return null;
            }
        }

        public new bool Insert(Bike component)
        {
            try
            {
                dbContext.Add(component);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new Bike Update(Bike component)
        {
            Bike original = GetByID(component.ID.ToString());

            return original.Modify(component);
        }
    }
}
