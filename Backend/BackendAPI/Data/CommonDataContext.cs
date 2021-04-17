using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    //Klasa opisująca wspólną część contextów dla różnych środowisk
    //Ma tutaj byc definicja DbSetów.
    public abstract class CommonDataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Bike> Bikes { get; set; }
        public DbSet<BikeStation> BikeStations { get; set; }
        public DbSet<Rental> Rentals { get; set; }

        public CommonDataContext(DbContextOptions
            options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
