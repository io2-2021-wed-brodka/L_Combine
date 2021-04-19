using BackendAPI.Models;
using BackendAPI.Helpers.DTOFactories;
using BackendAPI.Repository.Interfaces;
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
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BikesController : ControllerBase
    {
        private int GetRequestingUserID => int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier));
        private const int PerUserBikesLimit = 4;

        private IRentalRepository rentalRepository;
        private IBikeRepository bikeRepository;
        private IUserRepository userRepository;

        public BikesController(IRentalRepository rentalRepo, IBikeRepository bikeRepo, IUserRepository userRepo)
        {
            rentalRepository = rentalRepo;
            bikeRepository = bikeRepo;
            userRepository = userRepo;
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpGet("rented")]
        public ActionResult RentedGet()
        {
            int userId = GetRequestingUserID;

            var rentedBikes = rentalRepository.FindActiveRentals(userId)
                .Select(r => BikeDTOFactory.CreateBikeDTO(r.Bike, r.User));

            return Ok(new { Bikes = rentedBikes });
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpPost("rented")]
        [NotForBlocked]
        public ActionResult<BikeDTO> RentedPost([FromBody] IdDTO rent)
        {
            Bike bike;
            if (!int.TryParse(rent.Id, out int bikeId) || 
                (bike = bikeRepository.GetByID(bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            if (bike.State != ClassLibrary.BikeState.Working
                || bike.BikeStation?.State != ClassLibrary.BikeStationState.Working)
                throw new HttpResponseException("Bike is already rented, blocked or reserved by another user or station is blocked", 422);

            //Tutaj wg mnie należy dodać rodzaj odpowiedzi do specki. Na razie 406 wydaje się spełniać wymogi.
            if (rentalRepository.FindActiveRentals(GetRequestingUserID).Count() >= PerUserBikesLimit)
                throw new HttpResponseException($"Cannot rent a bike. You've already rented {PerUserBikesLimit} bikes.", 406);

            //Rower gotowy do wypożyczenia -> dopisanie wypożyczenia
            rentalRepository.Insert(new Rental()
            {
                BikeID = bike.ID,
                StartDate = DateTime.Now,
                UserID = GetRequestingUserID,
            });
            bike.BikeStation = null;
            bikeRepository.SaveChanges();

            return new CreatedResult("/api/bikes/rented", BikeDTOFactory.CreateBikeDTO(bike, userRepository.GetByID(GetRequestingUserID)));
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpGet("reserved")]
        public ActionResult<string> ReservedGet()
        {
            return BadRequest();
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpPost("reserved")]
        public ActionResult<string> ReservedPost()
        {
            return BadRequest();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">Identyfikator usuwanej rezerwacji. </param>
        [HttpDelete("reserved/{id}")]
        public ActionResult<string> ReservedDelete([FromRoute]string id)
        {
            return BadRequest();
        }
    }
}
