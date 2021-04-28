using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.StationsService
{
    public class BaseStationTest: BaseTest
    {
        protected BackendAPI.Services.Classes.StationsService service;

        protected void CreateStationService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.StationsService(dbContext);
        }

        
    }
}
