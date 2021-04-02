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
            return Ok(new { Stations = stationRepository.Get() });
        }

        // GET: api/Stations/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<StationDTO> Get(int id)
        {
            var station = stationRepository.GetByID(id);
            if (station == null)
                return new NotFoundObjectResult(new ErrorDTO("Station not found"));
            return Ok(station) ;
        }


        [HttpGet("bikes/{id}")]
        public IActionResult GetBikes(int id)
        {
            var station = stationRepository.GetByID(id);
            //Według dokumentacji zwracamy zawsze response 200,
            //czyli zakładamy że id stacji jest poprawne
            return Ok(new { Bikes = station.Bikes } );
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
            return new CreatedResult(bike.ID.ToString(), bike);
        }

 
    }
}
