using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class BikeStationConfiguration : 
        IEntityTypeConfiguration<BikeStation>
    {
        public void Configure(EntityTypeBuilder<BikeStation> builder)
        {
            builder.ToTable("BikeSations");
            builder.Property(bs => bs.LocationName).HasMaxLength(100);
        }
    }
}
