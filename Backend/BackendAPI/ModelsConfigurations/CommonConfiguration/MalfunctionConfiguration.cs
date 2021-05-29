using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.CommonConfiguration
{
    public abstract class MalfunctionConfiguration : IEntityTypeConfiguration<Malfunction>
    {
        public virtual void Configure(EntityTypeBuilder<Malfunction> builder)
        {
            builder.ToTable("Malfunctions");

            builder.Property(m => m.ID).ValueGeneratedOnAdd();

            builder.HasOne(m => m.Bike).WithMany(b => b.Malfunctions)
                .HasForeignKey(m => m.BikeID);
            builder.HasOne(m => m.User).WithMany(u => u.Malfunctions)
                .HasForeignKey(m => m.ReportingUserID);
        }
    }
}
