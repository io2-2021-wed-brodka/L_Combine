using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.TestConfiguration
{
    public class BikeConfiguration : BackendAPI.ModelsConfigurations.CommonConfiguration.BikeConfiguration
    {
        public override void Configure(EntityTypeBuilder<Bike> builder)
        {
            base.Configure(builder);

            builder.HasData(
                new Bike { ID = 1,  State = ClassLibrary.BikeState.Working, BikeStationID = 3 },
                new Bike { ID = 2,  State = ClassLibrary.BikeState.Working, BikeStationID = 3 },
                new Bike { ID = 3,  State = ClassLibrary.BikeState.InService, BikeStationID = 3 },
                new Bike { ID = 4,  State = ClassLibrary.BikeState.Working, BikeStationID = 1 },
                new Bike { ID = 5,  State = ClassLibrary.BikeState.Blocked, BikeStationID = 1 },
                new Bike { ID = 6,  State = ClassLibrary.BikeState.Working, BikeStationID = 4 },
                new Bike { ID = 7,  State = ClassLibrary.BikeState.Working, BikeStationID = null },
                new Bike { ID = 8,  State = ClassLibrary.BikeState.Working, BikeStationID = null },
                new Bike { ID = 9,  State = ClassLibrary.BikeState.Working, BikeStationID = null },
                new Bike { ID = 10, State = ClassLibrary.BikeState.Working, BikeStationID = null },
                new Bike { ID=11, State=ClassLibrary.BikeState.Working, BikeStationID = 1},
                new Bike { ID = 12, State = ClassLibrary.BikeState.Blocked, BikeStationID = 4 }
                );

        }
    }
}
