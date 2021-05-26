using BackendAPI.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.TestConfiguration
{
    public class MalfunctionConfiguration :
        BackendAPI.ModelsConfigurations.CommonConfiguration.MalfunctionConfiguration
    {
        public override void Configure(EntityTypeBuilder<Malfunction> builder)
        {
            base.Configure(builder);
        }
    }
}
