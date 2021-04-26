using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
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

namespace BackendAPI.Controllers
{
    [Route("api/bikes/reserved")]
    [Authorize]
    [ApiController]
    public class ReservedBikesController : ControllerBase
    {
        private readonly IReservationsService reservationsService;

        private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public ReservedBikesController(IReservationsService reservationsService)
        {
            this.reservationsService = reservationsService;
        }

        [HttpGet]
        public ActionResult GetReservations()
        {
            var result = reservationsService.GetReservations(UserId);
            return Ok(new { Bikes = result });
        }

        [HttpPost]
        [NotForBlocked]
        public ActionResult<ReservationDTO> AddReservation([FromBody] IdDTO bikeId)
        {
            var result = reservationsService.ReserveBike(UserId, bikeId.Id);
            return new CreatedResult(result.Id, result);
        }

        [HttpDelete("{id}")]
        public ActionResult RemoveReservation(string id)
        {
            reservationsService.CancelReservation(UserId, id);
            return NoContent();
        }

    }
}
