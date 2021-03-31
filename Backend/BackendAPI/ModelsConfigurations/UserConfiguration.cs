using BackendAPI.Models;
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
            builder.HasIndex(c => c.Login).IsUnique();

            builder.HasData(
                new User { ID=1, Name="ImieTestowe", LastName="NazwiskoTestowe", Login="login1", Password="pass1"},
                new User { ID = 2, Name = "Imie2", LastName = "Nazwisko2", Login="login2", Password="pass2"},
                new User { ID = 3, Name = "Grzegorz", LastName = "Brzęczeszykiewicz", Login = "login3", Password = "pass3" },
                new User { ID = 4, Name = "Imie3", LastName = "Nazwisko3", Login = "login4", Password = "pass4" }
                );
        }
    }
}
