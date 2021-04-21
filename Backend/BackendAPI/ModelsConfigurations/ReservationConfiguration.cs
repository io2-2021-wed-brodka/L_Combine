using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.ToTable("Reservations");

            builder.Property(r => r.ID).ValueGeneratedOnAdd();

            builder.HasOne(r => r.Bike).WithMany(b => b.Reservations)
                .HasForeignKey(r => r.BikeID);
            builder.HasOne(r => r.User).WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserID);
            builder.HasOne(r => r.BikeStation).WithMany(bs => bs.Reservations)
                .HasForeignKey(r => r.BikeStationID);

        }
    }
}
