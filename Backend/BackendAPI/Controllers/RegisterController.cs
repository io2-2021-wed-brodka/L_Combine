using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
using ClassLibrary;
using ClassLibrary.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private IUserRepository userRepository;
        public RegisterController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        //POST api/register
        [HttpPost]
        public IActionResult Post([FromBody] AuthenticateRequest model)
        {
            //Sprawdz, czy podany login istnieje juz w bazie
            if (userRepository.Get().Where(u => u.Login == model.Login).Any())
                throw new HttpResponseException("Given login already exists in database.", 409);

            //Dodaj uzytkownika do bazy
            using (StringHash stringHash = new StringHash())
            {
                userRepository.Insert(new User()
                {
                    Login = model.Login,
                    PasswordHash = stringHash.GetHash(model.Password),
                    Name = "ROZSZERZYC_REJESTRACJE",
                    LastName = "ROZSZERZYC_REJESTRACJE"
                });
            }
            userRepository.SaveChanges();

            //Zwroc token
            AuthenticateResponse response = userRepository.Authenticate(model);

            return Ok(response);
        }
    }
}
