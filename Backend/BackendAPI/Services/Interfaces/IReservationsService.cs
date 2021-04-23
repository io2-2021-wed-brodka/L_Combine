using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface IReservedBikesService
    {
        IEnumerable<ReservationDTO> GetReservations(string userId);
        ReservationDTO ReserveBike(string userId, string bikeId);
        void CancelReservation(string userId, string bikeId);
    }
}
