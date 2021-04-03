using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendAPI.Models.DTOFactories
{
    public static class BikeDTOFactory
    {
        public static BikeDTO CreateBikeDTO(Bike bike, User user = null)
        {
            BikeStatusDTO status;
            UserDTO bikeUser = null;
            if (bike.State == ClassLibrary.BikeState
                .Working)
            {
                if (user != null)
                {
                    bikeUser = new UserDTO()
                    {
                        Id = user.ID,
                        Name = user.Name
                    };
                    status = BikeStatusDTO.Rented;
                }
                else
                    status = BikeStatusDTO.Available;
            }
            else
            {
                status = BikeStatusDTO.Blocked;
            }
            StationDTO station =
                bike.BikeStationID == null ? null : new StationDTO()
                {
                    Id = bike.BikeStationID.Value,
                    Name = bike.BikeStation.LocationName
                };

            return new BikeDTO()
            {
                Id = bike.ID,
                BikeStatus = status,
                Station = station,
                User = bikeUser
            };
        }
    }
}
