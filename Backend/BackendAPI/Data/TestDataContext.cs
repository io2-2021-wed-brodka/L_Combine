using BackendAPI.Models;
using BackendAPI.ModelsConfigurations.TestConfigurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Data
{
    //Klasa opisująca konfigurację tabel oraz dane początkowe dla bazy w środowisku testowym.
    public class TestDataContext: CommonDataContext
    {
        public TestDataContext(DbContextOptions<CommonDataContext>
            options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserTestConfiguration());
            modelBuilder.ApplyConfiguration(new BikeTestConfiguration());
            modelBuilder.ApplyConfiguration(new BikeStationTestConfiguration());
            modelBuilder.ApplyConfiguration(new RentalTestConfiguration());
        }
    }
}
