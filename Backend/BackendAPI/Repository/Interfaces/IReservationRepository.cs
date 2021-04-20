﻿using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public interface IReservationRepository: IGenericRepository<Reservation>
    {
        IList<Reservation> GetReservationsByBike(int bikeId);
        IList<Reservation> GetActiveReservations();
        IList<Reservation> GetActiveReservationsByBike(int bikeId);
        IList<Reservation> GetActiveReservationsByUser(int UserId);
    }
}
