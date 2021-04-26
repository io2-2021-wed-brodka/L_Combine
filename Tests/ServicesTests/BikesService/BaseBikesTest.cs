using System;
using System.Collections.Generic;
using System.Text;
using BackendAPI.Data;
using BackendAPI.Services.Classes;

namespace ServicesTests.BikesService
{
    public class BaseBikesTest: BaseTest
    {
        protected BackendAPI.Services.Classes.BikesService service;

        protected void CreateBikeService()
        {
            DataContext dbContext = GetContext();
            service = new BackendAPI.Services.Classes.BikesService(dbContext);
        }
    }
}
