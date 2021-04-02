using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;
using BackendAPI.Repository.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class StationsController : ControllerBase
    {
        private StationRepository stationRepository;

        public StationsController(StationRepository stationRepository)
        {
            this.stationRepository = stationRepository;
        }

        // GET: api/Stations
        [HttpGet]
        public ActionResult<StationList> Get()
        {
            return Ok(new StationList() { Stations = stationRepository.Get() });
        }

        // GET: api/Stations/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<BikeStation> Get(int id)
        {
            var station = stationRepository.GetByID(id);
            if (station == null)
                return new NotFoundObjectResult(new { message = "Station not found" });
            return Ok(station) ;
        }

        // POST: api/Stations
        [HttpPost]
        public ActionResult<BikeStation> Post([FromBody] NewStation newStation)
        {
            BikeStation station = new BikeStation()
            {
                LocationName = newStation.Name,
                State = ClassLibrary.BikeStationState.Working
            };
            stationRepository.Insert(station);
            //Tutaj według specyfikacji powinienem zwracać 201 i tylko w body station,
            //ale tutaj zwracam też lokalizację w nagłówku, bo CreatedResult
            //ma taki konstruktor
            return new CreatedResult(station.ID.ToString(), station);
        }

        //// PUT: api/Stations/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var station = stationRepository.GetByID(id);
            if (station == null)
                return new NotFoundObjectResult(
                    new Error() { Message = "Station not found" });
            //Tu spodziewam się problemów, że Bikes będzie nullem, trzeba będzie pewnie poprawic reposytoria
            if (station.Bikes.Count == 0)
                return new UnprocessableEntityObjectResult(
                    new Error() { Message = "Station has bikes" });
            stationRepository.Delete(id);
            return Ok(station);
        }
    }
}
