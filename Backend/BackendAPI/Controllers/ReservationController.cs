using BackendAPI.Repository.Interfaces;
using ClassLibrary.DTO;
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
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private IRentalRepository rentalRepository;
        private IBikeRepository bikeRepository;

        private int GetRequestingUserID => int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier));

        public ReservationController(IRentalRepository rentalRepo, IBikeRepository bikeRepo)
        {
            this.rentalRepository = rentalRepo;
            this.bikeRepository = bikeRepo;
        }

        [HttpGet]
        public ActionResult GetReservations()
        {
            return NotFound();
        }

        [HttpPost]
        public ActionResult AddReservation([FromBody] IdDTO bikeId)
        {
            return NotFound();
        }

        [HttpDelete("{id}")]
        public ActionResult removeReservation([FromRoute] string bikeId)
        {
            return NotFound();
        }

    }
}
