using BackendAPI.Models;
using ClassLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.CommonConfiguration
{
    //Klasa odpowiada za wspólną część definicji tabeli "Users".
    //Metoda używana następnie przez inne konfiguracje funkcjonujące w róznych środowiskach
    public class UserCommonConfiguration
    {
        protected void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.Property(c => c.LastName).HasMaxLength(50).IsRequired();
            builder.Property(c => c.Name).HasMaxLength(50).IsRequired();
            builder.Property(c => c.ID).ValueGeneratedOnAdd();
            builder.Property(c => c.Login).HasMaxLength(20).IsRequired();
            builder.Property(c => c.PasswordHash).HasMaxLength(64).IsRequired();
            builder.HasIndex(c => c.Login).IsUnique();
        }
    }
}
