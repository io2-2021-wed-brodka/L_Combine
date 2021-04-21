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
    [Route("api/bikes/reserved")]
    [Authorize]
    [ApiController]
    public class ReservedBikesController : ControllerBase
    {
        private IReservationRepository reservationRepository;
        //private IRentalRepository rentalRepository;
        private IUserRepository userRepository;
        private IBikeRepository bikeRepository;

        private int RequestingUserID => int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier));

        public ReservedBikesController(IUserRepository userRepo, 
            IReservationRepository reservationRepo, 
            IBikeRepository bikeRepo)
        {
            this.reservationRepository = reservationRepo;
            this.userRepository = userRepo;
            this.bikeRepository = bikeRepo;
        }

        [HttpGet]
        public ActionResult GetReservations()
        {
            var reservedBikes = reservationRepository
                .GetActiveReservationsByUser(RequestingUserID)
                .Select(r => ReservedBikeDTOFactory.Create(r));
            return Ok(new { Bikes = reservedBikes });
        }

        [HttpPost]
        public ActionResult<ReservedBikeDTO> AddReservation([FromBody] IdDTO bikeId)
        {
            //[BLOCKED] dodać blokowanie uzytkownikow

            Bike reservedBike;
            //To jest dramat - trzeba dodac chaina aby wywalic sciane ifow
            if (!int.TryParse(bikeId.Id, out int bikeID) || 
                (reservedBike = bikeRepository.GetByID(bikeID)) == null)
                throw new HttpResponseException("Bike not found", 404);

            //Tu poprawiłem bardzo ważną rzecz
            if (reservedBike.BikeStation == null)
                throw new HttpResponseException("Bike already rented", 422);

            if (reservedBike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException("Bike is blocked", 422);

            if (reservationRepository.GetActiveReservationByBike(reservedBike.ID) != null)
                throw new HttpResponseException("Bike already reserved", 422);

            //Dodałem warunek niżej bardzo ważny! Czytajmy speckę uważnie!
            if (reservedBike.BikeStation.State != ClassLibrary.BikeStationState.Working)
                throw new HttpResponseException("Bike station is blocked", 422);

            User user = userRepository.GetByID(RequestingUserID);
            Reservation reservation = new Reservation(user, reservedBike);
            reservationRepository.Insert(reservation);
            reservationRepository.SaveChanges();

            ReservedBikeDTO result = ReservedBikeDTOFactory.Create(reservation);

            return new CreatedResult(reservation.ID.ToString(), result);
        }

        [HttpDelete("{id}")]
        public ActionResult RemoveReservation(string id)
        {
            //[BLOCKED] dodać blokowanie uzytkownikow
            Bike reservedBike;

            //To jest dramat - trzeba dodac chaina aby wywalic sciane ifow
            if (!int.TryParse(id, out int bikeID) || 
                (reservedBike = bikeRepository.GetByID(bikeID)) == null)
                throw new HttpResponseException("Bike not found", 404);

            //Tego niżej specka nie precyzuje, poza tym nie wiem w czym
            //to miałoby przeszkadzać żeby anulować rezerwację czy coś,
            //w zasadzie jeśli np. zrobimy rezerwację, ale admin zablokuje rower
            //po naszej rzerwacji to powinniśmy móc ją anulować chyba chociaż
            //proszę o review.
            //Drugi if: jeśli bike jest wypożyczony, tzn. że nie ma aktywnej
            //rezerwacji, czyli też nie powinno się to zdarzyć

            /*if (reservedBike.State != ClassLibrary.BikeState.Working)
                throw new HttpResponseException("Bike is blocked", 422);

            if (rentalRepository.FindActiveRental(reservedBike.ID, user.ID) != null)
                throw new HttpResponseException("Bike already rented", 422);*/

            var activeReservation = reservationRepository.GetActiveReservationByBike(bikeID);
            if (activeReservation == null)
                throw new HttpResponseException("Bike is not reserved", 422);

            if (activeReservation.UserID != RequestingUserID)
                throw new HttpResponseException("Bike is reserved by another user", 422);

            reservationRepository.Delete(activeReservation.ID);
            reservationRepository.SaveChanges();
            return NoContent();
        }

    }
}
