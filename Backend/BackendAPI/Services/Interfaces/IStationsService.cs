using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface IStationsService
    {
        IEnumerable<StationDTO> GetAllStations();
        IEnumerable<StationDTO> GetActiveStations();
        StationDTO GetStation(string stationIdString);
        IEnumerable<BikeDTO> GetBikes(string stationIdString, string role);
        BikeDTO ReturnBike(string userIdString, string bikeIdString, string stationIdString);
        StationDTO AddStation(string name);
        void DeleteStation(string stationIdString);
    }
}
