﻿using BackendAPI.Models;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.Property(c => c.LastName).HasMaxLength(50).IsRequired();
            builder.Property(c => c.Name).HasMaxLength(50).IsRequired();
            builder.Property(c => c.ID).ValueGeneratedOnAdd();
            builder.Property(c => c.Login).HasMaxLength(20).IsRequired();
            builder.Property(c => c.PasswordHash).HasMaxLength(64).IsRequired();
            builder.HasIndex(c => c.Login).IsUnique();
            builder.Property(c => c.Role).HasMaxLength(10);

            using (StringHash stringHash = new StringHash())
            {
                builder.HasData(
                new User { ID = 1, Name = "ImieTestowe", LastName = "NazwiskoTestowe", Login = "login1", PasswordHash = stringHash.GetHash("pass1"), Role=Role.User },
                new User { ID = 2, Name = "Imie2", LastName = "Nazwisko2", Login = "login2", PasswordHash = stringHash.GetHash("pass2"), Role = Role.User },
                new User { ID = 3, Name = "Grzegorz", LastName = "Brzęczeszykiewicz", Login = "login3", PasswordHash = stringHash.GetHash("pass3"), Role = Role.User },
                new User { ID = 4, Name = "Imie3", LastName = "Nazwisko3", Login = "login4", PasswordHash = stringHash.GetHash("pass4"), Role = Role.User },
                new User { ID = 5, Name = "PostmanUserName", LastName = "PostmanUserLastName", Login = "PostmanUser", PasswordHash = stringHash.GetHash("PostmanUserPass"), Role = Role.User },
                new User { ID = 6, Name = "PostmanAdminName", LastName = "PostmanAdminLastName", Login = "PostmanAdmin", PasswordHash = stringHash.GetHash("PostmanAdminPass"), Role = Role.Admin},
                new User { ID = 7, Name = "PostmanTechName", LastName = "PostmanTechLastName", Login = "PostmanTech", PasswordHash = stringHash.GetHash("PostmanTechPass"), Role = Role.Tech },
                new User { ID = 8, Name = "ImieAdmina", LastName = "NazwiskoAdmina", Login = "admin", PasswordHash = stringHash.GetHash("admin"), Role = Role.Admin},
                new User { ID = 9, Name = "ImieTecha", LastName = "NazwiskoTecha", Login = "tech", PasswordHash = stringHash.GetHash("tech"), Role = Role.Tech }
                );
            }
        }
    }
}
