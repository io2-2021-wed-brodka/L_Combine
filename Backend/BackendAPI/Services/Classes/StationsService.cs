using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class StationsService : Service, IStationsService
    {
        const int DefaultBikesLimit = 10;

        [ActivatorUtilitiesConstructor]
        public StationsService(DataContext dbContext) : base(dbContext)
        {
        }

        public StationsService(TestDataContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<StationDTO> GetActiveStations()
        {
            return dbContext.BikeStations
                .Where(bs => bs.State == BikeStationState.Working)
                .ToList()
                //Uwaga!!!!!!
                //BARDZO WAŻNE JEST BY DO Select korzystającego
                //z fabryk DTO przekazywać nie IQueryable a już
                //skończoną kwerendę. W przeciwnym razie dostaniemy
                //błąd dotyczący wielowątkowego dostępu do bazy
                //(fabryki DTO korzystają z bazy danych)
                .Select(s => CreateStationDTO(s));
        }

        public IEnumerable<StationDTO> GetAllStations()
        {
            return dbContext.BikeStations.ToList().Select(s => CreateStationDTO(s));
        }

        public IEnumerable<BikeDTO> GetAvailableBikes(string stationIdString, string role)
        {
            int stationId = ParseStationId(stationIdString);

            BikeStation station;
            if ((station = dbContext
                .BikeStations
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException(ResMng.GetResource("StationNotFound"), 404);

            if (station.State == BikeStationState.Blocked
                && role == Role.User)
                throw new HttpResponseException(ResMng.GetResource("TechAdminListBikesBlockedStation"), 403);

            return dbContext.Bikes.Include(b => b.Reservations).Where(b =>
                b.BikeStationID == stationId &&
            //Dostępne rowery na stacji to te, które są
            //Working i nie mają aktywnych rezerwacji
                b.State == BikeState.Working &&
                !b.Reservations.Where(r => r.ExpireDate >= DateTime.Now).Any())
                .ToList().Select(b => CreateNotRentedNotReservedBikeDTO(b));
        }

        public StationDTO GetStation(string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);

            BikeStation station;
            if ((station = dbContext
                .BikeStations
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException(ResMng.GetResource("StationNotFound"), 404);

            return CreateStationDTO(station);
        }

        public BikeDTO ReturnBike(string userIdString, string bikeIdString, string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);
            int userId = ParseUserId(userIdString);
            int bikeId = ParseBikeId(bikeIdString);

            BikeStation station;
            Bike bike;
            if ((station = dbContext
                .BikeStations.Include(bs => bs.Bikes)
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException(ResMng.GetResource("StationNotFound"), 404);

            if ((bike = dbContext.Bikes.FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException(ResMng.GetResource("BikeNotFound"), 404);

            if (station.State == BikeStationState.Blocked)
                throw new HttpResponseException(ResMng.GetResource("BikeStationIsBlocked"), 422);

            var rental =
                (from r in dbContext.Rentals
                 where r.BikeID == bikeId 
                 && r.UserID == userId 
                 && r.EndDate == null
                 select r).FirstOrDefault();

            if (rental == null)
                throw new HttpResponseException(ResMng.GetResource("BikeNotRented"), 422);

            if (station.Bikes.Count >= station.BikesLimit)
                throw new HttpResponseException(ResMng.GetResource("BikeStationFull"), 422);

            bike.BikeStationID = stationId;
            rental.EndDate = DateTime.Now;

            //Uwaga! W momencie SaveChanges do bike zostanie
            //przypisane BikeStation, czyli w bikeDTOFactory
            //nie ma ryzyka, że BikeStation będzie nullem
            dbContext.SaveChanges();

            return CreateNotRentedNotReservedBikeDTO(bike);
        }

        public StationDTO AddStation(string name, int? bikesLimit)
        {
            var newStation = new BikeStation()
            {
                LocationName = name,
                State = BikeStationState.Working,
                BikesLimit = bikesLimit ?? DefaultBikesLimit
            };
            dbContext.BikeStations.Add(newStation);
            dbContext.SaveChanges();
            return CreateStationDTO(newStation);
        }

        public void DeleteStation(string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);

            BikeStation station;
            if ((station = dbContext.BikeStations
                .Include(bs => bs.Bikes)
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException(ResMng.GetResource("StationNotFound"), 404);

            if (station.State != BikeStationState.Blocked)
                throw new HttpResponseException(ResMng.GetResource("StationNotBlocked"), 422);

            if (station.Bikes.Any())
                throw new HttpResponseException(ResMng.GetResource("StationHasBikes"), 422);

            dbContext.BikeStations.Remove(station);
            dbContext.SaveChanges();
        }

        public IEnumerable<StationDTO> GetBlockedStations()
        {
            return (from bs in dbContext.BikeStations
                    where bs.State == BikeStationState.Blocked
                    select bs).ToList()
                    .Select(bs => CreateStationDTO(bs));
        }

        public StationDTO BlockStation(string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);

            BikeStation station;
            if ((station = dbContext.BikeStations
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException(ResMng.GetResource("StationNotFound"), 404);

            if (station.State == BikeStationState.Blocked)
                throw new HttpResponseException(ResMng.GetResource("StationAlreadyBlocked"), 422);

            var stationReservations = dbContext.Reservations
                .Where(r => r.BikeStationID == stationId).ToList();

            station.State = BikeStationState.Blocked;
            //Usuwamy wszystkie rezerwacje aktywne na stacji
            dbContext.Reservations.RemoveRange(stationReservations);

            dbContext.SaveChanges();

            return CreateStationDTO(station);
        }

        //[TEST]
        public void UnblockStation(string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);

            BikeStation station;
            if ((station = dbContext.BikeStations
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException(ResMng.GetResource("StationNotFound"), 404);

            if (station.State != BikeStationState.Blocked)
                throw new HttpResponseException(ResMng.GetResource("StationNotBlocked"), 422);

            station.State = BikeStationState.Working;
            dbContext.SaveChanges();

        }
    }
}
