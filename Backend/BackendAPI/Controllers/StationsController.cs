using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;
using BackendAPI.Repository.Repositories;
using ClassLibrary.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class StationsController : ControllerBase
    {
        private StationRepository stationRepository;
        private BikeRepository bikeRepository;

        public StationsController(StationRepository stationRepository,
            BikeRepository bikeRepository)
        {
            this.stationRepository = stationRepository;
            this.bikeRepository = bikeRepository;
        }

        // GET: api/Stations
        [HttpGet]
        public IActionResult Get()
        {
            var stations = stationRepository.Get()
                .Select(s => new StationDTO()
                { Id = s.ID, Name = s.LocationName });
            
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
                Id = station.ID,
                Name = station.LocationName
            }) ;
        }


        [HttpGet("bikes/{id}")]
        public IActionResult GetBikes(int id)
        {
            var station = stationRepository.GetByID(id);
            var bikes = station.Bikes.Select(b => 
                CreateBikeDTO(b));
            //Według dokumentacji zwracamy zawsze response 200,
            //czyli zakładamy że id stacji jest poprawne
            return Ok(new { Bikes = bikes } );
        }

        [HttpPost("bikes/{id}")]
        public ActionResult<BikeDTO> PostBike(int id, [FromBody] IdDTO bikeId)
        {
            var bike = bikeRepository.GetByID(bikeId.Id);
            if (bike == null)
                return new NotFoundObjectResult(new ErrorDTO("Bike not found"));
            var station = stationRepository.GetByID(id);
            if (station.State == ClassLibrary.BikeStationState.Blocked)
                return new UnprocessableEntityObjectResult(
                    new ErrorDTO("Cannot associate specified bike with specified station"));
            bike.BikeStationID = id;
            bikeRepository.Update(bike);
            bikeRepository.SaveChanges();
            return new CreatedResult(bike.ID.ToString(), 
                CreateBikeDTO(bike));
        }
        
        private BikeDTO CreateBikeDTO(Bike bike)
        {
            BikeStatusDTO status;
            UserDTO bikeUser = null;
            if (bike.State == ClassLibrary.BikeState
                .Working)
            {
                User user = bikeRepository.GetUser(bike);
                bikeUser = new UserDTO()
                {
                    Id = user.ID,
                    Name = user.Name
                };
                status = bikeUser == null ? BikeStatusDTO.Available : BikeStatusDTO.Rented;
            }
            else
            {
                status = BikeStatusDTO.Blocked;
            }
            StationDTO station = 
                bike.BikeStationID == null ? null : new StationDTO()
            {
                Id = bike.BikeStationID.Value,
                Name = bike.BikeStation.LocationName
            };

            return new BikeDTO()
            {
                Id = bike.ID,
                BikeStatus = status,
                Station = station,
                User = bikeUser
            };
        }

 
    }
}
