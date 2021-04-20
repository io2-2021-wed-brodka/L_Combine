using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Repositories
{
    class ReservationRepository : GenericRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(DataContext dbContext) : base(dbContext)
        { }

        private IQueryable<Reservation> GetAllReservations()
        {
            return dbContext.Reservations;
        }

        private IQueryable<Reservation> GetAllActiveReservations()
        {
            //Poniżej mamy aktywne rezerwacje, czyli nie powinno
            //być sytuacji, że BikeStation jest nullem ogólnie
            return dbContext.Reservations.Where(r => r.ExpireDate > DateTime.Now)
                .Include(r => r.Bike).ThenInclude(b => b.BikeStation);
        }

        public override bool Delete(int ID)
        {
            Reservation res = GetByID(ID);
            if (res == null)
                return false;
            dbContext.Reservations.Remove(res);
            return true;
        }

        public override IList<Reservation> Get()
        {
            return GetAllReservations().ToList();
        }

        public override Reservation GetByID(int ID)
        {
            return GetAllReservations().FirstOrDefault(r => r.ID == ID);
        }

        public override bool Insert(Reservation component)
        {
            dbContext.Reservations.Add(component);
            return true;
        }

        public override Reservation Update(Reservation component)
        {
            throw new NotImplementedException();
        }

        public IList<Reservation> GetReservationsByBike(int bikeId)
        {
            return GetAllReservations().Where(r => r.BikeID == bikeId).ToList();
        }

        public IList<Reservation> GetActiveReservations()
        {
            return GetAllActiveReservations().ToList();
        }

        public IList<Reservation> GetActiveReservationsByBike(int bikeId)
        {
            return GetAllActiveReservations().Where(r => r.BikeID == bikeId).ToList();
        }

        public IList<Reservation> GetActiveReservationsByUser(int userId)
        {
            return GetAllActiveReservations().Where(r => r.UserID == userId).ToList();
        }
    }
}
