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
        private int RequestingUserID => int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier));
        private const int PerUserBikesLimit = 4;

        private readonly IRentalRepository rentalRepository;
        private readonly IBikeRepository bikeRepository;
        private readonly IUserRepository userRepository;
        private readonly IReservationRepository reservationRepository;
        private readonly IBikeDTOFactory bikeDTOFactory;


        public BikesController(IRentalRepository rentalRepo, IBikeRepository bikeRepo, IUserRepository userRepo, IReservationRepository reservationRepo, IBikeDTOFactory bikeDTOFactory)
        {
            rentalRepository = rentalRepo;
            bikeRepository = bikeRepo;
            userRepository = userRepo;
            reservationRepository = reservationRepo;
            this.bikeDTOFactory = bikeDTOFactory;
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpGet("rented")]
        public ActionResult RentedGet()
        {
            int userId = RequestingUserID;

            //Poniżej są wypożyczone, czyli niezarezerwowane
            var rentedBikes = rentalRepository.FindActiveRentals(userId)
                .Select(r => bikeDTOFactory.Create(r.Bike, r.User, false));

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

            if (bike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException("Bike is blocked");

            if (bike.BikeStation == null)
                throw new HttpResponseException("Bike already rented");

            var reservation = reservationRepository.GetActiveReservationByBike(bike.ID);
            if ((reservation != null && reservation.UserID != RequestingUserID))
                throw new HttpResponseException("Bike already reserved", 422);

            if (bike.BikeStation?.State != ClassLibrary.BikeStationState.Working)
                throw new HttpResponseException("Bike station is blocked", 422);

            //Tutaj wg mnie należy dodać rodzaj odpowiedzi do specki. Na razie 406 wydaje się spełniać wymogi.
            if (rentalRepository.FindActiveRentals(RequestingUserID).Count() >= PerUserBikesLimit)
                throw new HttpResponseException($"Cannot rent a bike. You've already rented {PerUserBikesLimit} bikes.", 422);

            //Rower gotowy do wypożyczenia -> dopisanie wypożyczenia
            rentalRepository.Insert(new Rental()
            {
                BikeID = bike.ID,
                StartDate = DateTime.Now,
                UserID = RequestingUserID,
            });
            bike.BikeStationID = null;
            //Jeśli rower był zarezerwowany to usuwsamy rezerwację
            if (reservation != null)
                reservationRepository.Delete(reservation.ID);
            bikeRepository.SaveChanges();

            return new CreatedResult("/api/bikes/rented", bikeDTOFactory.Create(bike, userRepository.GetByID(RequestingUserID), false));
        }
    }
}
