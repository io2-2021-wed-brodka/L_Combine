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

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
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
        public ActionResult RentedGet()
        {
            var result = bikesService.GetRentedBikes(UserId);
            return Ok(new { Bikes = result });
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpPost("rented")]
        [NotForBlocked]
        public ActionResult<BikeDTO> RentedPost([FromBody] IdDTO bike)
        {
            BikeDTO result = bikesService.RentBike(UserId, bike.Id);
            return new CreatedResult("/api/bikes/rented", result);
        }
    }
}
