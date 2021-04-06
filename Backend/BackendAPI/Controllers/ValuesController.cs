﻿using BackendAPI.Data;
using BackendAPI.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private readonly IBikeRepository bikeRepo;
        private readonly IStationRepository stationRepo;
        private readonly IUserRepository userRepo;

        public ValuesController(IBikeRepository bikeRepo, IStationRepository stationRepo, IUserRepository userRepo)
        {
            this.bikeRepo = bikeRepo;
            this.stationRepo = stationRepo;
            this.userRepo = userRepo;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return stationRepo.Get().Select(x => x.ID.ToString()).ToList();
            //return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            if (id > 10)
                throw new HttpResponseException()
                {
                    Status = 409,
                    Value = "Za duze id"
                };
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
            
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
