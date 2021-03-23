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
            throw new NotImplementedException();
        }

        public new Bike GetByID(string ID)
        {
            throw new NotImplementedException();
        }

        public new bool Insert(Bike component)
        {
            throw new NotImplementedException();
        }

        public new void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public new Bike Update(Bike component)
        {
            throw new NotImplementedException();
        }
    }
}
