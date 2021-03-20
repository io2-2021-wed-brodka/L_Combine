using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class RentalConfiguration : IEntityTypeConfiguration<Rental>
    {
        public void Configure(EntityTypeBuilder<Rental> builder)
        {
            builder.ToTable("Rentals");
            builder.HasOne(r => r.Bike).WithMany(b => b.Rentals)
                .HasForeignKey(r => r.BikeID);
            builder.HasOne(r => r.User).WithMany(u => u.Rentals)
                .HasForeignKey(r => r.UserID);

            builder.HasData(
                new User() { Name = "Adam", LastName = "Adamowski" },
                new User() { Name = "Paweł", LastName = "Pawłowski" }  
                );
        }
    }
}
