using BackendAPI.Models;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BackendAPI.Services.Interfaces;
using ClassLibrary;

namespace BackendAPI.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class BikesController : ControllerBase
    {
        private readonly IBikesService bikesService;
        string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public BikesController(IBikesService bikesService)
        {
            this.bikesService = bikesService;
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpGet("rented")]
        public ActionResult GetRentedBikes()
        {
            var result = bikesService.GetRentedBikes(UserId);
            return Ok(new { Bikes = result });
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpPost("rented")]
        [NotForBlocked]
        public ActionResult<BikeDTO> RentBike([FromBody] IdDTO bike)
        {
            BikeDTO result = bikesService.RentBike(UserId, bike.Id);
            return Created("/api/bikes/rented", result);
        }

        [HttpGet]
        [Authorize(Roles = Role.Tech + "," + Role.Admin)]
        public IActionResult GetBikes()
        {
            var result = bikesService.GetBikesForAdmin();
            return Ok(new { Bikes = result });
        }

        [HttpPost]
        [Authorize(Roles = Role.Admin)]
        public ActionResult<BikeDTO> AddBike([FromBody] NewBikeDTO arg)
        {
            var result = bikesService.AddBike(arg.StationId);
            return Created(result.Id, result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Role.Admin)]
        public IActionResult DeleteBike(string id)
        {
            bikesService.DeleteBike(id);
            return NoContent();
        }
    }
}
