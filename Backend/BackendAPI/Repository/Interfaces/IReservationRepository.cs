using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    interface IReservationRepository: IGenericRepository<Reservation>
    {
        public IList<Reservation> GetReservationsByBike(Bike bike);
        public IList<Reservation> GetActiveReservations();
        public IList<Reservation> GetActiveReservationsByBike(Bike bike);
        public IList<Reservation> GetActiveReservationsByUser(User user);
    }
}
