using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.NormalConfiguration
{
    public class BikeStationConfiguration : 
        BackendAPI.ModelsConfigurations.CommonConfiguration.BikeStationConfiguration
    {
        public override void Configure(EntityTypeBuilder<BikeStation> builder)
        {
            base.Configure(builder);

            builder.HasData(
                new BikeStation { ID = 1, BikesLimit = 10, LocationName = "Warszawa Targowa", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 2, BikesLimit = 10, LocationName = "Warszawa Aleje Jerozolimskie", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 3, BikesLimit = 10, LocationName = "Warszawa PKiN", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 4, BikesLimit = 10, LocationName = "Warszawa Politechnika", State = ClassLibrary.BikeStationState.Working }
                );


        }
    }
}
