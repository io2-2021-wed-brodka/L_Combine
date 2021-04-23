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
        IEnumerable<BikeDTO> GetBikes(string stationId, string role);
        BikeDTO ReturnBike(string userId, string bikeId, string stationId);
    }
}
