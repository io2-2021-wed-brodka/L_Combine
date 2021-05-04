using System;
using System.Collections.Generic;
using System.Text;
using BackendAPI.Services.Classes;

namespace ServicesTests.TechsService
{
    public abstract class BaseTechsTest : BaseTest
    {
        protected BackendAPI.Services.Classes.TechsService service;

        protected void CreateTechsService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.TechsService(dbContext);
        }
    }
}
