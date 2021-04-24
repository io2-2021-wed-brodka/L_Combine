﻿using BackendAPI.Data;
using BackendAPI.Models;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public abstract class Service
    {
        protected readonly DataContext dbContext;

        public Service(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        protected int ParseUserId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("User not found", 404);
            return result;
        }

        protected int ParseStationId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("Station not found", 404);
            return result;
        }

        protected int ParseBikeId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("Bike not found", 404);
            return result;
        }

        //Niezwykle ważna uwaga!!!! 
        //Wywołanie Create...DTO MUSI być na obiekcie normalnym,
        //a nie na IQueryable. Nie można zatem wywołać
        //IQueryable.Select(s => Create...DTO(s))
        //bo to wywali błąd z wielowątkowym dostępem do bazy danych.
        //Trzeba zrobić IQueryable.ToList().Select(s => Create...DTO(s))
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
                    bikeUser = new UserDTO()
                    {
                        Id = user.ID.ToString(),
                        Name = user.Name
                    };
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
                BikeStatus = status,
                Station = station,
                User = bikeUser
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
                Status = status
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
    }
}