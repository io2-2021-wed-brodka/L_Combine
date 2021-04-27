﻿using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations
{
    public class RentalConfiguration : IEntityTypeConfiguration<Rental>
    {
        public void Configure(EntityTypeBuilder<Rental> builder)
        {
            builder.ToTable("Rentals");

            builder.Property(r => r.ID).ValueGeneratedOnAdd();

            builder.HasOne(r => r.Bike).WithMany(b => b.Rentals)
                .HasForeignKey(r => r.BikeID);
            builder.HasOne(r => r.User).WithMany(u => u.Rentals)
                .HasForeignKey(r => r.UserID);

            //builder.HasData(
            //    new Rental { ID=1, UserID=1, BikeID=1, StartDate=new DateTime(2021, 2, 20, 2, 0, 0), EndDate=new DateTime(2021, 2, 20, 2, 10, 15)},
            //    new Rental { ID = 2, UserID = 1, BikeID = 1, StartDate = new DateTime(2021, 2, 20, 3, 0, 0), EndDate= new DateTime(2021, 2, 20, 3, 15, 15) },
            //    new Rental { ID = 3, UserID = 2, BikeID = 2, StartDate = new DateTime(2021, 3, 15, 12, 0, 0), EndDate = new DateTime(2021, 3, 15, 12, 28, 0) },
            //    new Rental { ID = 4, UserID = 3, BikeID = 3, StartDate = new DateTime(2021, 3, 18, 21, 20, 12), EndDate = new DateTime(2021, 3, 18, 21, 39, 18) },
            //    new Rental { ID = 5, UserID = 3, BikeID = 2, StartDate = new DateTime(2021, 3, 20, 12, 40, 34), EndDate = new DateTime(2021, 3, 20, 13, 0, 56)}*/
            //    );
        }
    }
}
