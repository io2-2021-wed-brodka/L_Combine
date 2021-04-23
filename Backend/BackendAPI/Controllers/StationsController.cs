using System;
using System.Linq;
using System.Security.Claims;
using BackendAPI.Helpers;
using BackendAPI.Helpers.DTOFactories;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using BackendAPI.Services.Interfaces;
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
        private readonly IStationsService stationsService;

        string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);
        string UserRole => User.FindFirstValue(ClaimTypes.Role);

        public StationsController(
            IStationsService stationsService)
        {
            this.stationsService = stationsService;
        }

        //GET: api/stations
        [HttpGet]
        [Authorize(Roles = Role.Admin)]
        public IActionResult Get()
        {
            var result = stationsService.GetAllStations();
            return Ok(new { Stations = result });
        }

        // GET: api/stations/active
        [Route("active")]
        [HttpGet]
        public IActionResult GetActiveStations()
        {
            var result = stationsService.GetActiveStations();
            return Ok(new { Stations = result });
        }

        // GET: api/Stations/5
        [HttpGet("{id}")]
        [Authorize(Roles = Role.Admin + "," + Role.Tech)]
        public ActionResult<StationDTO> Get(string id)
        {
            var result = stationsService.GetStation(id);
            return Ok(result);
        }

        [HttpGet("{id}/bikes")]
        public IActionResult GetBikes(string id)
        {
            var result = stationsService.GetBikes(id, UserRole);
            return Ok(new { Bikes = result } );
        }

        [HttpPost("{id}/bikes")]
        public ActionResult<BikeDTO> PostBike(string id, [FromBody] IdDTO bikeId)
        {
            var result = stationsService.ReturnBike(UserId, bikeId.Id, id);
            //Poniżej false bo bike nie jest zarezerowwany
            return new CreatedResult(result.Id.ToString(), result);
        }
    }
}
