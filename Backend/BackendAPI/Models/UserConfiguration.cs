using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.Property(c => c.LastName).HasMaxLength(50);
            builder.Property(c => c.Name).HasMaxLength(50);

            builder.HasData(
                new User() { Name="Adam", LastName="Adamowski" },
                new User() { Name = "Paweł", LastName = "Pawłowski" }
                );
        }
    }
}
