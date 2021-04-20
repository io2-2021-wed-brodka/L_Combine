using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;
using ClassLibrary.DTO;

namespace BackendAPI.Helpers.DTOFactories
{
    public class ReservedBikeDTOFactory
    {
        public static ReservedBikeDTO Create(Reservation reservation)
        {
            return new ReservedBikeDTO()
            {
                BikeID = reservation.BikeID.ToString(),
                Station = new StationDTO()
                {
                    Id = reservation.Bike.BikeStationID.ToString(),
                    Name = reservation.Bike.BikeStation.LocationName
                },
                ReservedAt = reservation.ReservationDate,
                ReservedTill = reservation.ExpireDate
            };
        }
    }
}
