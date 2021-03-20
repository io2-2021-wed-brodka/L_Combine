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
        }
    }
}
