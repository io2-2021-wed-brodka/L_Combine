using BackendAPI.Models;
using BackendAPI.ModelsConfigurations.CommonConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.ModelsConfigurations.ProductionConfiguration
{
    //Konfiguracja i dane poczatkowe do tabeli produkcyjnej
    public class BikeStationProductionConfiguration : 
        BikeStationCommonConfiguration,
        IEntityTypeConfiguration<BikeStation>
    {
        public new void Configure(EntityTypeBuilder<BikeStation> builder)
        {
            base.Configure(builder);

            //Tutaj definicja danych zaladowanych do bazy produkcjynej
            //albo dodatkowe zaleznosci na tabeli
            builder.HasData(
                new BikeStation { ID = 1, LocationName = "Warszawa Targowa", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 2, LocationName = "Warszawa Aleje Jerozolimskie", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 3, LocationName = "Warszawa PKiN", State = ClassLibrary.BikeStationState.Working },
                new BikeStation { ID = 4, LocationName = "Warszawa Politechnika", State = ClassLibrary.BikeStationState.Blocked }
                );
        }
    }
}
