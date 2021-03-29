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

        public new bool Delete(int ID)
        {
            Bike bike = GetByID(ID);
            if (bike == null)
                return false;
            dbContext.Bikes.Remove(bike);
            return true;

        }

        public new IList<Bike> Get()
        {
            return dbContext.Bikes.ToList();
        }

        public new Bike GetByID(int ID)
        {
            return dbContext.Bikes.FirstOrDefault(b => b.ID == ID);
        }

        public new bool Insert(Bike component)
        {
            dbContext.Add(component);
            return true;
        }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new Bike Update(Bike component)
        {
            Bike original = GetByID(component.ID);

            return original.Modify(component);
        }
    }
}
