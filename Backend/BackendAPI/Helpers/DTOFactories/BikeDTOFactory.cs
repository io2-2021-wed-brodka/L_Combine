using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendAPI.Helpers.DTOFactories
{
    public interface IBikeDTOFactory
    {
        //Jeśli wiemy, czy rower jest zarezerowany czy nie, podajemy reserved,
        //w przeciwnym razie nie podajemy
        BikeDTO Create(Bike bike, User user, bool? reserved = null);
    }

    public class BikeDTOFactory: IBikeDTOFactory
    {
        readonly IBikeRepository bikeRepo;
        readonly IReservationRepository reservationRepo;
        readonly IStationDTOFactory stationDTOFactory;

        public BikeDTOFactory(IBikeRepository bikeRepo,
            IReservationRepository reservationRepo,
            IStationDTOFactory stationDTOFactory)
        {
            this.bikeRepo = bikeRepo;
            this.reservationRepo = reservationRepo;
            this.stationDTOFactory = stationDTOFactory;
        }

        //Poniżej bike powinien być różny od nulla
        public BikeDTO Create(Bike bike, User user, bool? reserved = null)
        {
            string status;
            UserDTO bikeUser = null;
            if (bike.State == ClassLibrary.BikeState
                .Working)
            {
                if (reserved == null)
                    reserved = reservationRepo.CheckIfBikeReserved(bike.ID);
                if (reserved.Value)
                    status = BikeStatusDTO.Reserved;
                else if (user != null)
                {
                    bikeUser = new UserDTO()
                    {
                        Id = user.ID.ToString(),
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
            StationDTO station = bike.BikeStationID == null ? null : 
                stationDTOFactory.Create(bike.BikeStation);

            return new BikeDTO()
            {
                Id = bike.ID.ToString(),
                BikeStatus = status,
                Station = station,
                User = bikeUser
            };
        }
    }
}
