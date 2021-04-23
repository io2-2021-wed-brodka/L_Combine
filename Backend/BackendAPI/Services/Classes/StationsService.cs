using BackendAPI.Data;
using BackendAPI.Helpers.DTOFactories;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class StationsService : IStationsService
    {
        private readonly DataContext dbContext;
        private readonly IBikeDTOFactory bikeDTOFactory;
        private readonly IStationDTOFactory stationDTOFactory;

        public StationsService(DataContext dbContext,
            IBikeDTOFactory bikeDTOFactory, 
            IStationDTOFactory stationDTOFactory)
        {
            this.dbContext = dbContext;
            this.bikeDTOFactory = bikeDTOFactory;
            this.stationDTOFactory = stationDTOFactory;
        }

        public IEnumerable<StationDTO> GetActiveStations()
        {
            return dbContext.BikeStations
                .Where(bs => bs.State == ClassLibrary.BikeStationState.Working)
                .Select(s => stationDTOFactory.Create(s));
        }

        public IEnumerable<StationDTO> GetAllStations()
        {
            return dbContext.BikeStations.Select(s => stationDTOFactory.Create(s));
        }

        public IEnumerable<BikeDTO> GetBikes(string stationIdString, string role)
        {
            int stationId = ParseStationId(stationIdString);

            BikeStation station;
            if ((station = dbContext
                .BikeStations
                .Include(bs => bs.Bikes)
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException("Station not found", 404);

            if (station.State == BikeStationState.Blocked
                && role == Role.User)
                throw new HttpResponseException("Only tech and admin can list bikes at blocked station", 403);

            return station.Bikes.Select(b => 
                bikeDTOFactory.Create(b, (from r in dbContext.Rentals.Include(r => r.User)
                                          where r.BikeID == b.ID && r.EndDate == null
                                          select r.User).FirstOrDefault()));
        }

        private int ParseUserId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("User not found", 404);
            return result;
        }

        private int ParseStationId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("Station not found", 404);
            return result;
        }

        private int ParseBikeId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("Bike not found", 404);
            return result;
        }

        public StationDTO GetStation(string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);

            BikeStation station;
            if ((station = dbContext
                .BikeStations
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException("Station not found", 404);

            return stationDTOFactory.Create(station);
        }

        public BikeDTO ReturnBike(string userIdString, string bikeIdString, string stationIdString)
        {
            int stationId = ParseStationId(stationIdString);
            int userId = ParseUserId(userIdString);
            int bikeId = ParseBikeId(bikeIdString);

            BikeStation station;
            Bike bike;
            if ((station = dbContext
                .BikeStations
                .FirstOrDefault(bs => bs.ID == stationId)) == null)
                throw new HttpResponseException("Station not found", 404);

            if ((bike = dbContext.Bikes.FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            if (station.State == BikeStationState.Blocked)
                throw new HttpResponseException("Bike station is blocked", 422);

            var rental =
                (from r in dbContext.Rentals
                 where r.BikeID == bikeId 
                 && r.UserID == userId 
                 && r.EndDate == null
                 select r).FirstOrDefault();

            if (rental == null)
                throw new HttpResponseException("Bike is not rented by specific user", 422);

            bike.BikeStationID = stationId;
            rental.EndDate = DateTime.Now;

            //Uwaga! W momencie SaveChanges do bike zostanie
            //przypisane BikeStation, czyli w bikeDTOFactory
            //nie ma ryzyka, że BikeStation będzie nullem
            dbContext.SaveChanges();

            return bikeDTOFactory.Create(bike, null, false);
        }
    }
}
