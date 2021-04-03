using System;
using System.Linq;
using System.Security.Claims;
using BackendAPI.Models.DTOFactories;
using BackendAPI.Repository.Interfaces;
using ClassLibrary.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class StationsController : ControllerBase
    {
        private IStationRepository stationRepository;
        private IBikeRepository bikeRepository;
        private IRentalRepository rentalRepository;

        public StationsController(
            IStationRepository stationRepository,
            IBikeRepository bikeRepository,
            IRentalRepository rentalRepository)
        {
            this.stationRepository = stationRepository;
            this.bikeRepository = bikeRepository;
            this.rentalRepository = rentalRepository;
        }

        // GET: api/Stations
        [HttpGet]
        public IActionResult Get()
        {
            var stations = stationRepository.Get()
                .Select(s => new StationDTO()
                { Id = s.ID.ToString(), Name = s.LocationName });
            
            return Ok(new { Stations = stations });
        }

        // GET: api/Stations/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<StationDTO> Get(int id)
        {
            var station = stationRepository.GetByID(id);
            if (station == null)
                return new NotFoundObjectResult(new ErrorDTO("Station not found"));
            return Ok(new StationDTO()
            {
                Id = station.ID.ToString(),
                Name = station.LocationName
            }) ;
        }


        [HttpGet("bikes/{id}")]
        public IActionResult GetBikes(int id)
        {
            var station = stationRepository.GetByID(id);
            var bikes = station.Bikes.Select(b => 
                BikeDTOFactory.CreateBikeDTO(b, 
                bikeRepository.GetUser(b)));
            //Według dokumentacji zwracamy zawsze response 200,
            //czyli zakładamy że id stacji jest poprawne
            return Ok(new { Bikes = bikes } );
        }

        [HttpPost("bikes/{id}")]
        public ActionResult<BikeDTO> PostBike(int id, [FromBody] IdDTO bikeId)
        {
            var bike = bikeRepository.GetByID(int.Parse(bikeId.Id));
            if (bike == null)
                return new NotFoundObjectResult(new ErrorDTO("Bike not found"));
            var station = stationRepository.GetByID(id);
            if (station.State == ClassLibrary.BikeStationState.Blocked)
                return new UnprocessableEntityObjectResult(
                    new ErrorDTO("Cannot associate specified bike with specified station"));

            var userId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier));
            var rental = rentalRepository
                .FindActiveRental(bike.ID, userId);
            //Tego poniżej specyfikacja nie precyzuje jbc
            if (rental == null)
                return new UnprocessableEntityObjectResult(
                    new ErrorDTO("Cannot associate specified bike with specified station"));

            bike.BikeStationID = id;
            rental.EndDate = DateTime.Now;

            //Wystarczy saveChanges na jednym z repo
            bikeRepository.SaveChanges();
            return new CreatedResult(bike.ID.ToString(),
                BikeDTOFactory.CreateBikeDTO(bike,
                bikeRepository.GetUser(bike)));
        }
    }
}
