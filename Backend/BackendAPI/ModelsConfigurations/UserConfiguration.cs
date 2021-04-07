using BackendAPI.Models;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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

            using (SHA256 sha256Hash = SHA256.Create())
            {
                builder.HasData(
                new User { ID = 1, Name = "ImieTestowe", LastName = "NazwiskoTestowe", Login = "login1", PasswordHash = StringHash.GetHash(sha256Hash, "pass1") },
                new User { ID = 2, Name = "Imie2", LastName = "Nazwisko2", Login = "login2", PasswordHash = StringHash.GetHash(sha256Hash, "pass2") },
                new User { ID = 3, Name = "Grzegorz", LastName = "Brzęczeszykiewicz", Login = "login3", PasswordHash = StringHash.GetHash(sha256Hash, "pass3") },
                new User { ID = 4, Name = "Imie3", LastName = "Nazwisko3", Login = "login4", PasswordHash = StringHash.GetHash(sha256Hash, "pass4") }
                );
            }
        }
    }
}
