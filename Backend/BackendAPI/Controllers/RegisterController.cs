using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
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
        private readonly ILoginService loginService;

        public RegisterController(ILoginService loginService)
        {
            this.loginService = loginService;
        }

        //POST api/register
        [HttpPost]
        public ActionResult<AuthenticateResponseDTO> Post([FromBody] AuthenticateRequestDTO request)
        {
            var result = loginService.Register(request.Login, request.Password);
            return Ok(result);
        }
    }
}
