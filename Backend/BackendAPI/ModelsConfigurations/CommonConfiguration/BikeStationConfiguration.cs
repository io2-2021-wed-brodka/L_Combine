using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.CommonConfiguration
{
    public abstract class BikeStationConfiguration : 
        IEntityTypeConfiguration<BikeStation>
    {
        public virtual void Configure(EntityTypeBuilder<BikeStation> builder)
        {
            builder.ToTable("BikeStations");

            builder.Property(bs => bs.LocationName).HasMaxLength(150);
            builder.Property(bs => bs.ID).ValueGeneratedOnAdd();
            builder.Property(bs => bs.LocationName).IsRequired();
        }
    }
}
