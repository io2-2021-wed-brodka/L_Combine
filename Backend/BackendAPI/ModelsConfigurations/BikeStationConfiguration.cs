using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations
{
    public class BikeStationConfiguration : 
        IEntityTypeConfiguration<BikeStation>
    {
        public void Configure(EntityTypeBuilder<BikeStation> builder)
        {
            builder.ToTable("BikeStations");

            builder.Property(bs => bs.LocationName).HasMaxLength(150);
            builder.Property(bs => bs.ID).ValueGeneratedOnAdd();
            builder.Property(bs => bs.LocationName).IsRequired();

            builder.HasData(
                new BikeStation { ID = 1, LocationName = "Warszawa Targowa", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 2, LocationName = "Warszawa Aleje Jerozolimskie", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 3, LocationName = "Warszawa PKiN", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 4, LocationName = "Warszawa Politechnika", State = ClassLibrary.BikeStationState.Blocked }
                );


        }
    }
}
