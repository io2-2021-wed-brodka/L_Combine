using System;
using System.Linq;
using System.Security.Claims;
using BackendAPI.Helpers;
using BackendAPI.Models;
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
        public IActionResult GetAllStations()
        {
            var result = stationsService.GetAllStations();
            return Ok(new { Stations = result });
        }

        [HttpPost]
        [Authorize(Roles = Role.Admin)]
        public ActionResult<StationDTO> AddStation([FromBody] NewStationDTO newStation)
        {
            var result = stationsService.AddStation(newStation.Name);
            return new CreatedResult(result.Id, result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Role.Admin)]
        public IActionResult DeleteStation(string id)
        {
            stationsService.DeleteStation(id);
            return new NoContentResult();
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
        public ActionResult<BikeDTO> ReturnBike(string id, [FromBody] IdDTO bikeId)
        {
            var result = stationsService.ReturnBike(UserId, bikeId.Id, id);
            //Poniżej false bo bike nie jest zarezerowwany
            return new CreatedResult(result.Id.ToString(), result);
        }
    }
}
