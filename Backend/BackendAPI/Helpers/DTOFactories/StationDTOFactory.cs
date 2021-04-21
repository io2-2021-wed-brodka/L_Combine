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
        readonly IBikeRepository bikeRepo;

        public StationDTOFactory(IBikeRepository bikeRepo)
        {
            this.bikeRepo = bikeRepo;
        }

        //Poniżej station powinna być rózna od nulla
        public StationDTO Create(BikeStation station)
        {
            var status = station.State == ClassLibrary.BikeStationState.Blocked 
                ? StationStatusDTO.Blocked : StationStatusDTO.Active;
            return new StationDTO()
            {
                Id = station.ID.ToString(),
                ActiveBikesCount = bikeRepo.GetActiveBikesCount(station.ID),
                Name = station.LocationName,
                Status = status
            };
        }
    }
}
