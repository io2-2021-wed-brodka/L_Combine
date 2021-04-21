using System;
using System.Linq;
using System.Security.Claims;
using BackendAPI.Helpers;
using BackendAPI.Helpers.DTOFactories;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class StationsController : ControllerBase
    {
        readonly IStationRepository stationRepository;
        readonly IBikeRepository bikeRepository;
        readonly IRentalRepository rentalRepository;
        readonly IReservationRepository reservationRepository;
        readonly IBikeDTOFactory bikeDTOFactory;
        readonly IStationDTOFactory stationDTOFactory;

        private string RequestingUserRole => 
            User.FindFirstValue(ClaimTypes.Role);

        public StationsController(
            IStationRepository stationRepository,
            IBikeRepository bikeRepository,
            IRentalRepository rentalRepository,
            IReservationRepository reservationRepository,
            IBikeDTOFactory bikeDTOFactory,
            IStationDTOFactory stationDTOFactory)
        {
            this.stationRepository = stationRepository;
            this.bikeRepository = bikeRepository;
            this.rentalRepository = rentalRepository;
            this.reservationRepository = reservationRepository;
            this.bikeDTOFactory = bikeDTOFactory;
            this.stationDTOFactory = stationDTOFactory;
        }

        //GET: api/stations
        [HttpGet]
        [Authorize(Roles = Role.Admin)]
        public IActionResult Get()
        {
            var stations = stationRepository.Get()
                .Select(bs => stationDTOFactory.Create(bs));
            return Ok(new { Stations = stations });
        }

        // GET: api/stations/active
        [Route("active")]
        [HttpGet]
        public IActionResult GetActiveStations()
        {
            var stations = stationRepository
                .Get(bs => bs.State == ClassLibrary.BikeStationState.Working)
                .Select(s => stationDTOFactory.Create(s));
            
            return Ok(new { Stations = stations });
        }

        // GET: api/Stations/5
        [HttpGet("{id}")]
        [Authorize(Roles = Role.Admin + "," + Role.Tech)]
        public ActionResult<StationDTO> Get(string id)
        {
            BikeStation station;

            if (!int.TryParse(id, out int stationId) ||
                (station = stationRepository.GetByID(stationId)) == null)
                throw new HttpResponseException("Station not found", 404);

            return Ok(stationDTOFactory.Create(station));
        }

        [HttpGet("{id}/bikes")]
        public IActionResult GetBikes(string id)
        {
            BikeStation station;

            if (!int.TryParse(id, out int stationId) || 
                (station = stationRepository.GetByID(stationId)) == null)
                throw new HttpResponseException("Station not found", 404);

            if (station.State == BikeStationState.Blocked
                && RequestingUserRole == Role.User)
                throw new HttpResponseException("Only tech and admin can list bikes at blocked station", 403);

            var bikes = station.Bikes.Select(b => bikeDTOFactory.Create(b, bikeRepository.GetUser(b)));

            return Ok(new { Bikes = bikes } );
        }

        [HttpPost("{id}/bikes")]
        public ActionResult<BikeDTO> PostBike(string id, [FromBody] IdDTO bikeIdObj)
        {
            BikeStation station;
            Bike bike;

            if (!int.TryParse(id, out int stationId) || 
                (station = stationRepository.GetByID(stationId)) == null)
                throw new HttpResponseException("Station not found", 404);

            if (!int.TryParse(bikeIdObj.Id, out int bikeId) || 
                (bike = bikeRepository.GetByID(bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            if (station.State == ClassLibrary.BikeStationState.Blocked)
                throw new HttpResponseException("Bike station is blocked", 422);

            var userId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier));
            var rental = rentalRepository
                .FindActiveRental(bike.ID, userId);
            //Tego poniżej specyfikacja nie precyzuje jbc
            if (rental == null)
                throw new HttpResponseException("Bike is not rented by specific user", 422);

            bike.BikeStationID = stationId;
            rental.EndDate = DateTime.Now;

            //Wystarczy saveChanges na jednym z repo
            bikeRepository.SaveChanges();
            //Poniżej false bo bike nie jest zarezerowwany
            return new CreatedResult(bike.ID.ToString(),
                bikeDTOFactory.Create(bike,
                bikeRepository.GetUser(bike), false));
        }
    }
}
