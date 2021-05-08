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
    [Route("api/[controller]")]
    [Authorize(Roles = Role.Admin)]
    [ApiController]
    public class TechsController : ControllerBase
    {
        private readonly ITechsService techsService;

        public TechsController(ITechsService techsService)
        {
            this.techsService = techsService;
        }

        // GET: api/Techs
        [HttpGet]
        public IActionResult Get()
        {
            var result = techsService.GetAllTechs();
            return Ok(new { Techs = result });
        }

        // GET: api/Techs/5
        [HttpGet("{id}")]
        public ActionResult<UserDTO> Get(string id)
        {
            var result = techsService.GetTech(id);
            return Ok(result);
        }

        // POST: api/Techs
        [HttpPost]
        public ActionResult<UserDTO> Post([FromBody] NewTechDTO newTech)
        {
            var result = techsService.AddTech(newTech.Name, newTech.Password);
            return Created("api/techs", result);
        }

        // DELETE: api/techs/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            techsService.DeleteTech(id);
            return NoContent();
        }
    }
}
