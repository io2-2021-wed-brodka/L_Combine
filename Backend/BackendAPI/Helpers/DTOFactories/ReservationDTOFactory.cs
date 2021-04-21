using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;
using ClassLibrary.DTO;

namespace BackendAPI.Helpers.DTOFactories
{
    public interface IReservationDTOFactory
    {
        ReservationDTO Create(Reservation reservation);
    }

    public class ReservationDTOFactory: IReservationDTOFactory
    {
        readonly IStationDTOFactory stationDTOFactory;

        public ReservationDTOFactory(IStationDTOFactory stationDTOFactory)
        {
            this.stationDTOFactory = stationDTOFactory;
        }

        //Poniżej reservation powinna być różna od nulla
        public ReservationDTO Create(Reservation reservation)
        {
            return new ReservationDTO()
            {
                Id = reservation.BikeID.ToString(),
                //Skoro jest rezerwacja, to reservation.BikeStation != null
                Station = stationDTOFactory.Create(reservation.BikeStation),
                ReservedAt = reservation.ReservationDate,
                ReservedTill = reservation.ExpireDate
            };
        }
    }
}
