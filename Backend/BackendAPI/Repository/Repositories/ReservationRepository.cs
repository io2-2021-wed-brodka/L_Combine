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
            return dbContext.Reservations.Where(r => r.ExpireDate.CompareTo(DateTime.Now) > 0);
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

        public IList<Reservation> GetReservationsByBike(Bike bike)
        {
            return GetAllReservations().Where(r => r.BikeID == bike.ID).ToList();
        }

        public IList<Reservation> GetActiveReservations()
        {
            return GetAllActiveReservations().ToList();
        }

        public IList<Reservation> GetActiveReservationsByBike(Bike bike)
        {
            return GetAllActiveReservations().Where(r => r.BikeID == bike.ID).ToList();
        }

        public IList<Reservation> GetActiveReservationsByUser(User user)
        {
            return GetAllActiveReservations().Where(r => r.UserID == user.ID).ToList();
        }
    }
}
