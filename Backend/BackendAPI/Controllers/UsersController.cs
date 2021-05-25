using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("[controller]")]
    [Authorize(Roles = Role.Admin)]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        // GET: api/users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var result = usersService.GetAllUsers();
            return Ok(new { Users = result });
        }

        // GET: api/users/blocked
        [HttpGet("blocked")]
        public IActionResult GetBlockedUsers()
        {
            var result = usersService.GetBlockedUsers();
            return Ok(new { Users = result });
        }

        // POST: api/users/blocked
        [HttpPost("blocked")]
        public ActionResult<UserDTO> BlockUser([FromBody] IdDTO userId)
        {
            var result = usersService.BlockUser(userId.Id);
            return new CreatedResult(result.Id, result);
        }

        // DELETE: api/blocked/5
        [HttpDelete("blocked/{id}")]
        public IActionResult UnblockUser(string id)
        {
            usersService.UnblockUser(id);
            return NoContent();
        }
    }
}
