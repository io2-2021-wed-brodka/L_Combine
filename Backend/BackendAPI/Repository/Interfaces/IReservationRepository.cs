using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public interface IReservationRepository: IGenericRepository<Reservation>
    {
        IList<Reservation> GetReservationsByBike(Bike bike);
        IList<Reservation> GetActiveReservations();
        IList<Reservation> GetActiveReservationsByBike(Bike bike);
        IList<Reservation> GetActiveReservationsByUser(User user);
    }
}
