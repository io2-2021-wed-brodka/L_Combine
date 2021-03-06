using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.CommonConfiguration
{
    public abstract class BikeConfiguration : IEntityTypeConfiguration<Bike>
    {
        public virtual void Configure(EntityTypeBuilder<Bike> builder)
        {
            builder.ToTable("Bikes");

            builder.Property(b => b.ID).ValueGeneratedOnAdd();

            builder.HasOne(b => b.BikeStation).WithMany(bs =>
                bs.Bikes).HasForeignKey(b => b.BikeStationID);
        }
    }
}
