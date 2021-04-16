using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.CommonConfiguration
{
    //Klasa odpowiada za wspólną część definicji tabeli "Bikes".
    //Metoda używana następnie przez inne konfiguracje funkcjonujące w róznych środowiskach
    public class BikeCommonConfiguration
    {
        protected void Configure(EntityTypeBuilder<Bike> builder)
        {
            builder.ToTable("Bikes");

            builder.Property(b => b.ID).ValueGeneratedOnAdd();

            builder.HasOne(b => b.BikeStation).WithMany(bs =>
                bs.Bikes).HasForeignKey(b => b.BikeStationID);
        }
    }
}
