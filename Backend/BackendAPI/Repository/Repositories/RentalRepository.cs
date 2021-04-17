using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public class RentalRepository: GenericRepository<Rental>, IRentalRepository
    {
        public RentalRepository(CommonDataContext dbContext) : base(dbContext)
        { }

        public override bool Delete(int ID)
        {
            Rental rent = GetByID(ID);
            if (rent == null)
                return false;
            dbContext.Rentals.Remove(rent);
            return true;

        }

        public override bool Insert(Rental component)
        {
            dbContext.Add(component);
            return true;
        }

        public override IList<Rental> Get(IncludeData<Rental> includeFilter = null)
        {
            if (includeFilter == null)
                return dbContext.Rentals.ToList();
            return includeFilter(dbContext.Rentals).ToList();
        }

        public override Rental GetByID(int ID, IncludeData<Rental> includeFilter = null)
        {
            return Get(includeFilter).Where(r => r.ID == ID).FirstOrDefault();
        }

        public Rental FindActiveRental(int bikeId, int userId, IncludeData<Rental> includeFilter = null)
        {
            return
                (from r in Get(includeFilter)
                 where r.BikeID == bikeId && r.UserID == userId &&
                     r.EndDate == null
                 select r).FirstOrDefault();
        }

        public IList<Rental> FindActiveRentals(int userId, IncludeData<Rental> includeFilter = null)
        {
            return Get(includeFilter)
                .Where(r => r.UserID == userId && r.EndDate == null)
                .ToList();
        }
    }
}
