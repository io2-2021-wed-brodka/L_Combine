using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUserRepository userRepository;
        public LoginController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        //POST api/login
        [HttpPost]
        public IActionResult Post([FromBody]AuthenticateRequest model)
        {
            var response = userRepository.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Login lub hasło jest niepoprawne" });

            return Ok(response);
        }
    }
}