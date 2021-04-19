using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repository.Repositories
{
    public class BikeRepository : GenericRepository<Bike>, IBikeRepository
    {
        public BikeRepository(CommonDataContext dbContext) : base(dbContext)
        { }

        public override bool Delete(int ID)
        {
            Bike bike = GetByID(ID);
            if (bike == null)
                return false;
            dbContext.Bikes.Remove(bike);
            return true;

        }

        public override bool Insert(Bike component)
        {
            dbContext.Add(component);
            return true;
        }

        public override IList<Bike> Get(IncludeData<Bike> includeFilter = null)
        {
            if (includeFilter != null)
                return includeFilter(dbContext.Bikes);
            return dbContext.Bikes.ToList();
        }

        public override Bike GetByID(int ID, IncludeData<Bike> includeFilter = null)
        {
            return Get(includeFilter).Where(b => b.ID == ID).FirstOrDefault();
        }
    }
}
