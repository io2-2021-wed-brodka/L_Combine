using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.CommonConfiguration
{
    public class RentalConfiguration : IEntityTypeConfiguration<Rental>
    {
        public virtual void Configure(EntityTypeBuilder<Rental> builder)
        {
            builder.ToTable("Rentals");

            builder.Property(r => r.ID).ValueGeneratedOnAdd();

            builder.HasOne(r => r.Bike).WithMany(b => b.Rentals)
                .HasForeignKey(r => r.BikeID);
            builder.HasOne(r => r.User).WithMany(u => u.Rentals)
                .HasForeignKey(r => r.UserID);
        }
    }
}
