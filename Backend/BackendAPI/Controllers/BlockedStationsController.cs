using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/stations/blocked")]
    [Authorize(Roles = Role.Admin)]
    [ApiController]
    public class BlockedStationsController : ControllerBase
    {
        private readonly IStationsService stationsService;

        public BlockedStationsController(IStationsService stationsService)
        {
            this.stationsService = stationsService;
        }

        // GET: api/stations/blocked
        [HttpGet]
        public IActionResult GetBlockedStations()
        {
            var result = stationsService.GetBlockedStations();
            return Ok(new { Stations = result });
        }

        // POST: api/stations/blocked
        [HttpPost]
        public ActionResult<StationDTO> BlockStation([FromBody] IdDTO stationId)
        {
            var result = stationsService.BlockStation(stationId.Id);
            return new CreatedResult(result.Id, result);
        }

        // DELETE: api/stations/blocked/5
        [HttpDelete("{id}")]
        public IActionResult UnblockStation(string id)
        {
            stationsService.UnblockStation(id);
            return NoContent();
        }
    }
}
