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
        public StationRepository(CommonDataContext context): base(context)
        { }

        public override bool Delete(int ID)
        {
            BikeStation station = GetByID(ID);
            if (station == null)
                return false;
            dbContext.BikeStations.Remove(station);
            return true;
        }

        public override IList<BikeStation> Get(IncludeData<BikeStation> includeFilter = null)
        {
            if (includeFilter == null)
                return dbContext.BikeStations.ToList();
            return includeFilter(dbContext.BikeStations).ToList();
        }

        public IList<BikeStation> Get(Func<BikeStation, bool> filter, IncludeData<BikeStation> includeFilter = null)
        {
            return Get(includeFilter).Where(filter).ToList();
        }

        public override BikeStation GetByID(int ID, IncludeData<BikeStation> includeFilter = null)
        {
            return Get(includeFilter).FirstOrDefault(b => b.ID == ID);
        }

        public override bool Insert(BikeStation component)
        {
            var res = dbContext.BikeStations.Add(component);
            return true;
        }
    }
}
