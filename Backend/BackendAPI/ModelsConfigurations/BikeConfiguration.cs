using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations
{
    public class BikeConfiguration : IEntityTypeConfiguration<Bike>
    {
        public void Configure(EntityTypeBuilder<Bike> builder)
        {
            builder.ToTable("Bikes");

            builder.Property(b => b.ID).ValueGeneratedOnAdd();

            builder.HasOne(b => b.BikeStation).WithMany(bs =>
                bs.Bikes).HasForeignKey(b => b.BikeStationID);

            builder.HasData(
                new Bike { ID=1, State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { ID=2, State=ClassLibrary.BikeState.Working, BikeStationID=3},
                new Bike { ID = 3, State = ClassLibrary.BikeState.InService, BikeStationID = 3 },
                new Bike { ID = 4, State=ClassLibrary.BikeState.Working, BikeStationID=1},
                new Bike { ID=5, State=ClassLibrary.BikeState.Working, BikeStationID=1},
                new Bike { ID=6, State=ClassLibrary.BikeState.Working, BikeStationID=4},
                new Bike { ID=7, State=ClassLibrary.BikeState.Working, BikeStationID = 1}
                );

        }
    }
}
