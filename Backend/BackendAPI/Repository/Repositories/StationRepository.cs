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
    public class StationRepository : GenericRepository<BikeStation>, IStationRepository
    {
        public StationRepository(DataContext context): base(context)
        { }

        public override bool Delete(int ID)
        {
            BikeStation station = GetByID(ID);
            if (station == null)
                return false;
            dbContext.BikeStations.Remove(station);
            return true;
        }

        public override IList<BikeStation> Get()
        {
            return dbContext.BikeStations
                .ToList();
        }

        public override BikeStation GetByID(int ID)
        {
            return dbContext.BikeStations
                .Include(bs => bs.Bikes).FirstOrDefault(x => x.ID == ID);
        }

        public override bool Insert(BikeStation component)
        {
            var res = dbContext.BikeStations.Add(component);
            return true;
        }

        public override BikeStation Update(BikeStation component)
        {
            dbContext.Entry(GetByID(component.ID)).CurrentValues.SetValues(component);
            return component;
        }
    }
}
