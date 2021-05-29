using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using BackendAPI.ModelsConfigurations.TestConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Data
{
    public class TestDataContext: CommonDataContext
    {
        public TestDataContext(DbContextOptions
           options)
          : base(options)
        {
        }

       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new BikeConfiguration());
            modelBuilder.ApplyConfiguration(new BikeStationConfiguration());
            modelBuilder.ApplyConfiguration(new RentalConfiguration());
            modelBuilder.ApplyConfiguration(new ReservationConfiguration());
            modelBuilder.ApplyConfiguration(new MalfunctionConfiguration());
        }
    }
}
