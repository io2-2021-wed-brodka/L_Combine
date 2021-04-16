using BackendAPI.Models;
using BackendAPI.ModelsConfigurations.CommonConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.TestConfigurations
{
    //Konfiguracja i dane poczatkowe do tabeli testowej
    public class BikeTestConfiguration : BikeCommonConfiguration, IEntityTypeConfiguration<Bike>
    {
        public new void Configure(EntityTypeBuilder<Bike> builder)
        {
            base.Configure(builder);

            //Tutaj definicja danych zaladowanych do bazy testowej
            //albo dodatkowe zaleznosci na tabeli
            builder.HasData(
                new Bike { ID = 1, State = ClassLibrary.BikeState.Working, BikeStationID = 3 },
                new Bike { ID = 2, State = ClassLibrary.BikeState.Working, BikeStationID = 3 },
                new Bike { ID = 3, State = ClassLibrary.BikeState.InService, BikeStationID = 3 },
                new Bike { ID = 4, State = ClassLibrary.BikeState.Working, BikeStationID = 1 },
                new Bike { ID = 5, State = ClassLibrary.BikeState.Working, BikeStationID = 1 },
                new Bike { ID = 6, State = ClassLibrary.BikeState.Working, BikeStationID = 4 },
                new Bike { ID = 7, State = ClassLibrary.BikeState.Working, BikeStationID = 1 }
                );

        }
    }
}
