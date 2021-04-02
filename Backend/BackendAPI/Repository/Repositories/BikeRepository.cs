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
        public BikeRepository(DataContext dbContext) : base(dbContext)
        { }

        public override bool Delete(int ID)
        {
            Bike bike = GetByID(ID);
            if (bike == null)
                return false;
            dbContext.Bikes.Remove(bike);
            return true;

        }

        public override IList<Bike> Get()
        {
            return dbContext.Bikes.ToList();
        }

        public override Bike GetByID(int ID)
        {
            return dbContext.Bikes.Include(b => b.BikeStation).FirstOrDefault(b => b.ID == ID);
        }

        public override bool Insert(Bike component)
        {
            dbContext.Add(component);
            return true;
        }

        public override Bike Update(Bike component)
        {
            dbContext.Entry(GetByID(component.ID)).CurrentValues.SetValues(component);
            return component;
        }

        public User GetUser(Bike bike)
        {
            var user=
                (from r in dbContext.Rentals.Include(r => r.User)
                where r.BikeID == bike.ID && r.EndDate == null
                select r.User).FirstOrDefault();
            //user może być nullem
            return user;
        }
    }
}
