using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Services.Interfaces;
using ClassLibrary.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/bikes/blocked")]
    [ApiController]
    public class BlockedBikesController : ControllerBase
    {
        private readonly IBikesService bikesService;

        public BlockedBikesController(IBikesService bikesService)
        {
            this.bikesService = bikesService;
        }

        // POST: api/bikes/blocked
        [HttpPost]
        public ActionResult<BikeDTO> Post([FromBody] IdDTO bikeId)
        {
            var result = bikesService.BlockBike(bikeId.Id);
            return new CreatedResult(result.Id, result);
        }

        // DELETE: api/bikes/blocked/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            bikesService.UnblockBike(id);
            return new NoContentResult();
        }
    }
}
