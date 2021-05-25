using BackendAPI.Data;
using BackendAPI.Models;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public abstract class Service
    {
        protected readonly CommonDataContext dbContext;

        public Service(CommonDataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private int ParseId(string id, string name)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException($"{name} not found", 404);
            return result;
        }

        protected int ParseUserId(string id)
        {
            return ParseId(id, "User");
        }

        protected int ParseTechId(string id)
        {
            return ParseId(id, "Tech");
        }

        protected int ParseStationId(string id)
        {
            return ParseId(id, "Station");
        }

        protected int ParseBikeId(string id)
        {
            return ParseId(id, "Bike");
        }

        //Niezwykle ważna uwaga!!!! 
        //Wywołanie Create...DTO MUSI być na obiekcie normalnym,
        //a nie na IQueryable. Nie można zatem wywołać
        //IQueryable.Select(s => Create...DTO(s))
        //bo to wywali błąd z wielowątkowym dostępem do bazy danych.
        //Trzeba zrobić IQueryable.ToList().Select(s => Create...DTO(s))

        protected BikeDTO CreateNotRentedNotReservedBikeDTO(Bike bike)
        {
            string status;
            if (bike.State == ClassLibrary.BikeState.Working)
                status = BikeStatusDTO.Available;
            else
                status = BikeStatusDTO.Blocked;
            return new BikeDTO()
            {
                Status = status,
                Id = bike.ID.ToString(),
                Station = CreateStationDTO(bike.BikeStation),
                User = null
            };
        }

        protected BikeDTO CreateBikeDTO(Bike bike, User user, bool? reserved = null)
        {
            string status;
            UserDTO bikeUser = null;
            if (bike.State == ClassLibrary.BikeState
                .Working)
            {
                if (reserved == null)
                    reserved = dbContext.Reservations
                                .Where(r => r.BikeID == bike.ID
                                && r.ExpireDate >= DateTime.Now).Any();
                if (reserved.Value)
                    status = BikeStatusDTO.Reserved;
                else if (user != null)
                {
                    bikeUser = CreateUserDTO(user);
                    status = BikeStatusDTO.Rented;
                }
                else
                    status = BikeStatusDTO.Available;
            }
            else
            {
                status = BikeStatusDTO.Blocked;
            }
            StationDTO station = bike.BikeStationID == null ? null :
                CreateStationDTO(bike.BikeStation);

            return new BikeDTO()
            {
                Id = bike.ID.ToString(),
                Status = status,
                Station = station,
                User = bikeUser
            };
        }

        protected UserDTO CreateUserDTO(User user)
        {
            return new UserDTO()
            {
                Id = user.ID.ToString(),
                Name = user.Login
            };
        }

        protected StationDTO CreateStationDTO(BikeStation station)
        {
            var status = station.State == ClassLibrary.BikeStationState.Blocked
                ? StationStatusDTO.Blocked : StationStatusDTO.Active;
            return new StationDTO()
            {
                Id = station.ID.ToString(),
                ActiveBikesCount = (from b in dbContext.Bikes
                                    where b.BikeStationID == station.ID //rower stoi na stacji (w szczególności nie jest wypożyczony)
                                    && b.State == ClassLibrary.BikeState.Working //stan roweru to working
                                    && !(from r in dbContext.Reservations
                                         where r.BikeID == b.ID
                                        && r.ExpireDate >= DateTime.Now
                                         select r).Any()  //nie ma aktywnych rezerwacji
                                    select b).Count(),
                Name = station.LocationName,
                Status = status,
                BikesLimit = station.BikesLimit
            };
        }

        protected ReservationDTO CreateReservationDTO(Reservation reservation)
        {
            return new ReservationDTO()
            {
                Id = reservation.BikeID.ToString(),
                //Skoro jest rezerwacja, to reservation.BikeStation != null
                Station = CreateStationDTO(reservation.BikeStation),
                ReservedAt = reservation.ReservationDate,
                ReservedTill = reservation.ExpireDate
            };
        }

        protected BikeDTO CreateBikeDTOWithReservedUser(Bike bike, User user, bool? reserved = null)
        {
            var result = CreateBikeDTO(bike, user, reserved);
            if (result.Status == BikeStatusDTO.Reserved)
                result.User = CreateUserDTO((from r in dbContext.Reservations.Include(r => r.User)
                                             where r.ExpireDate > DateTime.Now
                                             select r.User).FirstOrDefault());
            return result;
        }
    }
}
