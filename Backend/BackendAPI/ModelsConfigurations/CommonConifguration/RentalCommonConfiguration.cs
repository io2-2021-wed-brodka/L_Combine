using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.CommonConfiguration
{
    //Klasa odpowiada za wspólną część definicji tabeli "Rentals".
    //Metoda używana następnie przez inne konfiguracje funkcjonujące w róznych środowiskach
    public class RentalCommonConfiguration
    {
        protected void Configure(EntityTypeBuilder<Rental> builder)
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
