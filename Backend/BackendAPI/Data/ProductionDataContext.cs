using BackendAPI.Models;
using BackendAPI.ModelsConfigurations;
using BackendAPI.ModelsConfigurations.ProductionConfiguration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Data
{
    //Klasa opisująca konfigurację tabel oraz dane początkowe dla bazy w środowisku produkcyjnym.
    public class ProductionDataContext : CommonDataContext
    {
        public ProductionDataContext(DbContextOptions<ProductionDataContext> 
            options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserProductionConfiguration());
            modelBuilder.ApplyConfiguration(new BikeProductionConfiguration());
            modelBuilder.ApplyConfiguration(new BikeStationProductionConfiguration());
            modelBuilder.ApplyConfiguration(new RentalProductionConfiguration());
        }
    }
}
