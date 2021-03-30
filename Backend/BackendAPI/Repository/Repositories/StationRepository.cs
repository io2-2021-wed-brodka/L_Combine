using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public class StationRepository : GenericRepository<BikeStation>, IStationRepository
    {
        public StationRepository(DataContext context): base(context)
        { }

        public new bool Delete(int ID)
        {
            BikeStation station = GetByID(ID);
            if (station == null)
                return false;
            dbContext.BikeStations.Remove(station);
            return true;
        }

        public new IList<BikeStation> Get()
        {
            return dbContext.BikeStations.ToList();
        }

        public new BikeStation GetByID(int ID)
        {
            return dbContext.BikeStations.FirstOrDefault(x => x.ID == ID);
        }

        public new bool Insert(BikeStation component)
        {
            var res = dbContext.BikeStations.Add(component);
            return true;
        }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new BikeStation Update(BikeStation component)
        {
            dbContext.Entry(GetByID(component.ID)).CurrentValues.SetValues(component);
            return component;
        }
    }
}
