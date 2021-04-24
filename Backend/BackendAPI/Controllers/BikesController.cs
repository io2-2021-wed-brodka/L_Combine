﻿using BackendAPI.Models;
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
            return new CreatedResult("/api/bikes/rented", result);
        }

        [Authorize(Roles = Role.Tech + "," + Role.Admin)]
        [HttpGet]
        public IActionResult GetBikes()
        {
            var result = bikesService.GetBikes();
            return Ok(new { Bikes = result });
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public ActionResult<BikeDTO> AddBike([FromBody] NewBikeDTO arg)
        {
            var result = bikesService.AddBike(arg.StationId);
            return new CreatedResult(result.Id, result);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public IActionResult DeleteBike(string id)
        {
            bikesService.DeleteBike(id);
            return NoContent();
        }
    }
}
