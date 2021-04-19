using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;
using ClassLibrary.DTO;

namespace BackendAPI.Helpers.DTOFactories
{
    public class ReservationDTOFactory
    {
        public static ReservationDTO CreateReservation(Reservation reservation, BikeStation onStation)
        {
            return new ReservationDTO()
            {
                BikeID = reservation.BikeId.ToString(),
                Station = new StationDTO()
                {
                    Id = onStation.ID.ToString(),
                    Name = onStation.LocationName
                },
                ReservedAt = reservation.ReservationDate,
                ReservedTill = reservation.ExpireDate
            };
        }
    }
}
