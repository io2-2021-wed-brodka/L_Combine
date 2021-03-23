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

        public bool Delete(int ID)
        {
            BikeStation station = GetByID(ID);

            context.Remove(station);
            return true;//TODO: to sprawdzić!
        }

        public IList<BikeStation> Get()
        {
            return context.BikeStations.ToList();
        }

        public BikeStation GetByID(int ID)
        {
            return context.BikeStations.First(x => x.ID == ID);
        }

        public bool Insert(BikeStation component)
        {
            var res = context.BikeStations.Add(component);
            return true;//TODO: to sprawdzić!
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public BikeStation Update(BikeStation component)
        {
            var res = context.Update(component);
            return res.Entity;
        }
    }
}
