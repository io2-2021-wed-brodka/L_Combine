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
        public static ReservationDTO Create(Reservation reservation)
        {
            return new ReservationDTO()
            {
                BikeID = reservation.BikeID.ToString(),
                Station = new StationDTO()
                {
                    Id = reservation.BikeStationID.ToString(),
                    Name = reservation.BikeStation.LocationName
                },
                ReservedAt = reservation.ReservationDate,
                ReservedTill = reservation.ExpireDate
            };
        }
    }
}
