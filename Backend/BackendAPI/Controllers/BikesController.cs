using BackendAPI.Models;
using BackendAPI.Models.DTOFactories;
using BackendAPI.Repository.Interfaces;
using ClassLibrary.DTO;
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

            BikeDTO[] rentedBikes = rentalRepository.FindActiveRentals(userId)
                .Select(r => BikeDTOFactory.CreateBikeDTO(r.Bike, r.User)).ToArray();

            return Ok(new { Bikes = rentedBikes });
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpPost("rented")]
        public ActionResult<BikeDTO> RentedPost([FromBody] RentBikeDTO rent)
        {
            if (!int.TryParse(rent.Id, out int bikeId))
                return BadRequest(new ErrorDTO("Wrong bike id" ));

            Bike bike = bikeRepository.GetByID(bikeId);

            if (bike.State != ClassLibrary.BikeState.Working
                || bike.BikeStation?.State != ClassLibrary.BikeStationState.Working)
                return new UnprocessableEntityObjectResult(new ErrorDTO("Bike is already rented, blocked or reserved by another user or station is blocked"));

            //Rower gotowy do wypożyczenia -> dopisanie wypożyczenia
            rentalRepository.Insert(new Rental()
            {
                BikeID = bike.ID,
                StartDate = DateTime.Now,
                UserID = GetRequestingUserID,
            });
            bike.BikeStation = null;
            bikeRepository.SaveChanges();

            return Ok(BikeDTOFactory.CreateBikeDTO(bike, userRepository.GetByID(GetRequestingUserID)));
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
