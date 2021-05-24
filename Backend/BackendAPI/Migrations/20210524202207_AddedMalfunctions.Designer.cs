﻿// <auto-generated />
using System;
using BackendAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackendAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210524202207_AddedMalfunctions")]
    partial class AddedMalfunctions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                        new { ID = 1, BikeStationID = 1, State = 0 },
                        new { ID = 2, BikeStationID = 1, State = 0 },
                        new { ID = 3, BikeStationID = 2, State = 0 },
                        new { ID = 4, BikeStationID = 2, State = 0 },
                        new { ID = 5, BikeStationID = 3, State = 0 },
                        new { ID = 6, BikeStationID = 3, State = 0 },
                        new { ID = 7, BikeStationID = 4, State = 0 },
                        new { ID = 8, BikeStationID = 4, State = 0 }
                    );
                });

            modelBuilder.Entity("BackendAPI.Models.BikeStation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BikesLimit");

                    b.Property<string>("LocationName")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<int>("State");

                    b.HasKey("ID");

                    b.ToTable("BikeStations");

                    b.HasData(
                        new { ID = 1, BikesLimit = 10, LocationName = "Warszawa Targowa", State = 0 },
                        new { ID = 2, BikesLimit = 10, LocationName = "Warszawa Aleje Jerozolimskie", State = 0 },
                        new { ID = 3, BikesLimit = 10, LocationName = "Warszawa PKiN", State = 0 },
                        new { ID = 4, BikesLimit = 10, LocationName = "Warszawa Politechnika", State = 0 }
                    );
                });

            modelBuilder.Entity("BackendAPI.Models.Malfunction", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BikeID");

                    b.Property<string>("Description");

                    b.Property<DateTime>("DetectionDate");

                    b.Property<int>("ReportingUserID");

                    b.Property<int>("State");

                    b.HasKey("ID");

                    b.HasIndex("BikeID");

                    b.HasIndex("ReportingUserID");

                    b.ToTable("Malfunctions");
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
                });

            modelBuilder.Entity("BackendAPI.Models.Reservation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BikeID");

                    b.Property<int>("BikeStationID");

                    b.Property<DateTime>("ExpireDate");

                    b.Property<DateTime>("ReservationDate");

                    b.Property<int>("UserID");

                    b.HasKey("ID");

                    b.HasIndex("BikeID");

                    b.HasIndex("BikeStationID");

                    b.HasIndex("UserID");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("BackendAPI.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Blocked");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<string>("Role")
                        .HasMaxLength(10);

                    b.HasKey("ID");

                    b.HasIndex("Login")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new { ID = 1, Blocked = false, LastName = "NazwiskoAdmina", Login = "admin", Name = "ImieAdmina", PasswordHash = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", Role = "Admin" }
                    );
                });

            modelBuilder.Entity("BackendAPI.Models.Bike", b =>
                {
                    b.HasOne("BackendAPI.Models.BikeStation", "BikeStation")
                        .WithMany("Bikes")
                        .HasForeignKey("BikeStationID");
                });

            modelBuilder.Entity("BackendAPI.Models.Malfunction", b =>
                {
                    b.HasOne("BackendAPI.Models.Bike", "Bike")
                        .WithMany("Malfunctions")
                        .HasForeignKey("BikeID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("BackendAPI.Models.User", "User")
                        .WithMany("Malfunctions")
                        .HasForeignKey("ReportingUserID")
                        .OnDelete(DeleteBehavior.Cascade);
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

            modelBuilder.Entity("BackendAPI.Models.Reservation", b =>
                {
                    b.HasOne("BackendAPI.Models.Bike", "Bike")
                        .WithMany("Reservations")
                        .HasForeignKey("BikeID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("BackendAPI.Models.BikeStation", "BikeStation")
                        .WithMany("Reservations")
                        .HasForeignKey("BikeStationID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("BackendAPI.Models.User", "User")
                        .WithMany("Reservations")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
