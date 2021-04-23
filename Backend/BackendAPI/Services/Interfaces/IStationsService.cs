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
        StationDTO GetStation();
        IEnumerable<BikeDTO> GetBikes(string stationIdString, string role);
        BikeDTO ReturnBike(string userIdString, string bikeIdString, string stationIdString);
    }
}
