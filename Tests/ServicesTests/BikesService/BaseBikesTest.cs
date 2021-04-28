using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Classes;

namespace ServicesTests.BikesService
{
    public class BaseBikesTest: BaseTest
    {
        protected BackendAPI.Services.Classes.BikesService service;

        protected void CreateBikeService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.BikesService(dbContext);
        }
    }
}
