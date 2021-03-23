using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    public class StationRepository : IStationRepository
    {
        public static StationRepository Instance;
        private DataContext context;
        private StationRepository(DataContext context)
        {
            this.context = context;
        }
        public static void InitialiseRepository(DataContext context)
        {
            StationRepository repository = new StationRepository(context);
            Instance = repository;
        }

        public bool Delete(string ID)
        {
            throw new NotImplementedException();
        }

        public IList<BikeStation> Get()
        {
            return context.BikeStations.ToList();
        }

        public BikeStation GetByID(string ID)
        {
            throw new NotImplementedException();
        }

        public bool Insert(BikeStation component)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public BikeStation Update(BikeStation component)
        {
            throw new NotImplementedException();
        }
    }
}
