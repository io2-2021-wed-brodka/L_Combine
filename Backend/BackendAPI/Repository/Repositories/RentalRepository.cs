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
        public RentalRepository(DataContext dbContext) : base(dbContext)
        { }

        private DbSet<Rental> GetAllRentals()
        {
            return dbContext.Rentals;
        }

        public override bool Delete(int ID)
        {
            Rental rent = GetByID(ID);
            if (rent == null)
                return false;
            dbContext.Rentals.Remove(rent);
            return true;

        }

        public Rental FindActiveRental(int bikeId, int userId)
        {
            //Może zwrócić nulla
            return 
                (from r in GetAllRentals()
                where r.BikeID == bikeId && r.UserID == userId &&
                    r.EndDate == null
                select r).FirstOrDefault();
        }

        public override IList<Rental> Get()
        {
            return GetAllRentals().ToList();
        }

        public override Rental GetByID(int ID)
        {
            return GetAllRentals().FirstOrDefault(b => b.ID == ID);
        }

        public override bool Insert(Rental component)
        {
            dbContext.Add(component);
            return true;
        }

        public override Rental Update(Rental component)
        {
            dbContext.Entry(GetByID(component.ID)).CurrentValues.SetValues(component);
            return component;
        }
        
        public IList<Rental> FindActiveRentals(int userId)
        {
            return GetAllRentals()
                .Where(r => r.UserID == userId && r.EndDate == null)
                .Include(r => r.Bike)
                .ThenInclude(b => b.BikeStation)
                .Include(r => r.User)
                .ToList();
        }
    }
}
