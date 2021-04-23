using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Helpers.DTOFactories
{
    public interface IStationDTOFactory
    {
        StationDTO Create(BikeStation bikeStation);
    }

    public class StationDTOFactory: IStationDTOFactory
    {
        private readonly DataContext dbContext;

        public StationDTOFactory(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Poniżej station powinna być rózna od nulla
        public StationDTO Create(BikeStation station)
        {
            var status = station.State == ClassLibrary.BikeStationState.Blocked 
                ? StationStatusDTO.Blocked : StationStatusDTO.Active;
            return new StationDTO()
            {
                Id = station.ID.ToString(),
                ActiveBikesCount = (from b in dbContext.Bikes
                                    where b.BikeStationID == station.ID //rower stoi na stacji (w szczególności nie jest wypożyczony)
                                    && b.State == ClassLibrary.BikeState.Working //stan roweru to working
                                    && !(from r in dbContext.Reservations
                                         where r.BikeID == b.ID
                                        && r.ExpireDate >= DateTime.Now
                                         select r).Any()  //nie ma aktywnych rezerwacji
                                    select b).Count(),
                Name = station.LocationName,
                Status = status
            };
        }
    }
}
