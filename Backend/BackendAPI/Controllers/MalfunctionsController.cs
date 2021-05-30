using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class MalfunctionsController : ControllerBase
    {
        private readonly IMalfunctionsService malfunctionsService;

        private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        public MalfunctionsController(IMalfunctionsService malfunctionsService)
        {
            this.malfunctionsService = malfunctionsService;
        }

        // GET: api/Malfunctions
        [Authorize(Roles = Role.Admin + "," + Role.Tech)]
        [HttpGet]
        public IActionResult GetMalfuctions()
        {
            var result = malfunctionsService.GetMalfunctions();
            return Ok(new { Malfunctions = result });
        }

        // POST: api/Malfunctions
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
