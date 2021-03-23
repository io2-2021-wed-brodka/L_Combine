﻿// <auto-generated />
using System;
using BackendAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackendAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BackendAPI.Models.Bike", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BikeStationID");

                    b.Property<int>("State");

                    b.HasKey("ID");

                    b.HasIndex("BikeStationID");

                    b.ToTable("Bikes");

                    b.HasData(
                        new { ID = 1, BikeStationID = 3, State = 0 },
                        new { ID = 2, BikeStationID = 3, State = 0 },
                        new { ID = 3, BikeStationID = 3, State = 1 },
                        new { ID = 4, BikeStationID = 1, State = 0 },
                        new { ID = 5, BikeStationID = 1, State = 0 },
                        new { ID = 6, BikeStationID = 4, State = 0 },
                        new { ID = 7, BikeStationID = 1, State = 0 }
                    );
                });

            modelBuilder.Entity("BackendAPI.Models.BikeStation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LocationName")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<int>("State");

                    b.HasKey("ID");

                    b.ToTable("BikeSations");

                    b.HasData(
                        new { ID = 1, LocationName = "Warszawa Targowa", State = 0 },
                        new { ID = 2, LocationName = "Warszawa Aleje Jerozolimskie", State = 0 },
                        new { ID = 3, LocationName = "Warszawa PKiN", State = 0 },
                        new { ID = 4, LocationName = "Warszawa Politechnika", State = 1 }
                    );
                });

            modelBuilder.Entity("BackendAPI.Models.Rental", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BikeID");

                    b.Property<DateTime?>("EndDate");

                    b.Property<DateTime>("StartDate");

                    b.Property<int>("UserID");

                    b.HasKey("ID");

                    b.HasIndex("BikeID");

                    b.HasIndex("UserID");

                    b.ToTable("Rentals");

                    b.HasData(
                        new { ID = 1, BikeID = 1, EndDate = new DateTime(2021, 2, 20, 2, 10, 15, 0, DateTimeKind.Unspecified), StartDate = new DateTime(2021, 2, 20, 2, 0, 0, 0, DateTimeKind.Unspecified), UserID = 1 },
                        new { ID = 2, BikeID = 1, EndDate = new DateTime(2021, 2, 20, 3, 15, 15, 0, DateTimeKind.Unspecified), StartDate = new DateTime(2021, 2, 20, 3, 0, 0, 0, DateTimeKind.Unspecified), UserID = 1 },
                        new { ID = 3, BikeID = 2, EndDate = new DateTime(2021, 3, 15, 12, 28, 0, 0, DateTimeKind.Unspecified), StartDate = new DateTime(2021, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), UserID = 2 },
                        new { ID = 4, BikeID = 3, EndDate = new DateTime(2021, 3, 18, 21, 39, 18, 0, DateTimeKind.Unspecified), StartDate = new DateTime(2021, 3, 18, 21, 20, 12, 0, DateTimeKind.Unspecified), UserID = 3 },
                        new { ID = 5, BikeID = 2, EndDate = new DateTime(2021, 3, 20, 13, 0, 56, 0, DateTimeKind.Unspecified), StartDate = new DateTime(2021, 3, 20, 12, 40, 34, 0, DateTimeKind.Unspecified), UserID = 3 }
                    );
                });

            modelBuilder.Entity("BackendAPI.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("ID");

                    b.ToTable("Users");

                    b.HasData(
                        new { ID = 1, LastName = "NazwiskoTestowe", Name = "ImieTestowe" },
                        new { ID = 2, LastName = "Nazwisko2", Name = "Imie2" },
                        new { ID = 3, LastName = "Brzęczeszykiewicz", Name = "Grzegorz" },
                        new { ID = 4, LastName = "Nazwisko3", Name = "Imie3" }
                    );
                });

            modelBuilder.Entity("BackendAPI.Models.Bike", b =>
                {
                    b.HasOne("BackendAPI.Models.BikeStation", "BikeStation")
                        .WithMany("Bikes")
                        .HasForeignKey("BikeStationID");
                });

            modelBuilder.Entity("BackendAPI.Models.Rental", b =>
                {
                    b.HasOne("BackendAPI.Models.Bike", "Bike")
                        .WithMany("Rentals")
                        .HasForeignKey("BikeID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("BackendAPI.Models.User", "User")
                        .WithMany("Rentals")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
