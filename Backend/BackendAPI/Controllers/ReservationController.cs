using BackendAPI.Helpers.DTOFactories;
using BackendAPI.Models;
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
    [Authorize]
    [Route("api/bikes/reserved")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private IReservationRepository reservationRepository;
        private IRentalRepository rentalRepository;
        private IUserRepository userRepository;
        private IBikeRepository bikeRepository;

        private int GetRequestingUserID => int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier));

        public ReservationController(IUserRepository userRepo, IReservationRepository reservationRepo, IBikeRepository bikeRepo, IRentalRepository rentalRepo)
        {
            this.reservationRepository = reservationRepo;
            this.userRepository = userRepo;
            this.bikeRepository = bikeRepo;
            this.rentalRepository = rentalRepo;
        }

        [HttpGet]
        public ActionResult GetReservations()
        {
            User user = userRepository.GetByID(GetRequestingUserID);
            return Ok(reservationRepository.GetActiveReservationsByUser(user));
        }

        [HttpPost]
        public ActionResult AddReservation([FromBody] IdDTO bikeId)
        {
            //[BLOCKED] dodać blokowanie uzytkownikow
            User user = userRepository.GetByID(GetRequestingUserID);

            //To jest dramat - trzeba dodac chaina aby wywalic sciane ifow
            if (int.TryParse(bikeId.Id, out int bikeID))
                throw new HttpResponseException("Bike not found", 404);

            Bike reservedBike = bikeRepository.GetByID(bikeID);
            if (reservedBike == null)
                throw new HttpResponseException("Bike not found", 404);

            if (reservedBike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException("Bike is blocked", 422);

            if (rentalRepository.FindActiveRental(reservedBike.ID, user.ID) != null)
                throw new HttpResponseException("Bike already rented", 422);

            if (reservationRepository.GetActiveReservationsByBike(reservedBike).Count() > 0)
                throw new HttpResponseException("Bike already reserved", 422);

            Reservation reservation = new Reservation(user, reservedBike);
            reservationRepository.Insert(reservation);
            reservationRepository.SaveChanges();

            ReservationDTO result = ReservationDTOFactory.CreateReservation(reservation, reservedBike.BikeStation);

            return new CreatedResult(reservation.ID.ToString(), result);
        }

        [HttpDelete("{id}")]
        public ActionResult RemoveReservation([FromRoute] string bikeId)
        {
            //[BLOCKED] dodać blokowanie uzytkownikow
            User user = userRepository.GetByID(GetRequestingUserID);

            //To jest dramat - trzeba dodac chaina aby wywalic sciane ifow
            if (int.TryParse(bikeId, out int bikeID))
                throw new HttpResponseException("Bike not found", 404);

            Bike reservedBike = bikeRepository.GetByID(bikeID);
            if (reservedBike == null)
                throw new HttpResponseException("Bike not found", 404);

            if (reservedBike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException("Bike is blocked", 422);

            if (rentalRepository.FindActiveRental(reservedBike.ID, user.ID) != null)
                throw new HttpResponseException("Bike already rented", 422);

            IList<Reservation> activeReservations = reservationRepository.GetActiveReservationsByBike(reservedBike);
            if (activeReservations.Count() == 0)
                throw new HttpResponseException("Bike is not reserved", 422);

            if (!activeReservations.All(r => r.UserID == user.ID))
                throw new HttpResponseException("Bike is reserved by another user", 422);

            if (activeReservations.Count() != 1)
                throw new InvalidOperationException("Bike is reserved one than once.");

            Reservation res = activeReservations.First();
            reservationRepository.Delete(res.ID);
            reservationRepository.SaveChanges();
            return Ok(res);
        }

    }
}
