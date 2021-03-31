using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
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

        public new bool Delete(int ID)
        {
            Rental rent = GetByID(ID);
            if (rent == null)
                return false;
            dbContext.Rentals.Remove(rent);
            return true;

        }

        public new IList<Rental> Get()
        {
            return dbContext.Rentals.ToList();
        }

        public new Rental GetByID(int ID)
        {
            return dbContext.Rentals.FirstOrDefault(b => b.ID == ID);
        }

        public new bool Insert(Rental component)
        {
            dbContext.Add(component);
            return true;
        }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new Rental Update(Rental component)
        {
            dbContext.Entry(GetByID(component.ID)).CurrentValues.SetValues(component);
            return component;
        }
    }
}
