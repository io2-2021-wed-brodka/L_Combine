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

        public BikesController(IRentalRepository rentalRepo)
        {
            rentalRepository = rentalRepo;
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpGet("rented")]
        public ActionResult<string> RentedGet()
        {
            

            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        [HttpPost("rented")]
        public ActionResult<string> RentedPost()
        {
            return BadRequest();
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
