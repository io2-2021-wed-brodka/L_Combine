using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public interface IStationRepository : IGenericRepository<BikeStation>
    {
        IList<BikeStation> Get(Func<BikeStation, bool> filter, IncludeData<BikeStation> includeFilter = null);
    }
}
