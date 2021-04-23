using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface IReservationsService
    {
        IEnumerable<ReservationDTO> GetReservations(string userIdString);
        ReservationDTO ReserveBike(string userIdString, string bikeIdString);
        void CancelReservation(string userIdString, string bikeIdString);
    }
}
