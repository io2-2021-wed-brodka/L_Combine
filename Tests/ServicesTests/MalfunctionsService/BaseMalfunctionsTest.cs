using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.MalfunctionsService
{
    abstract public class BaseMalfunctionsTest : BaseTest
    {
        protected BackendAPI.Services.Classes.MalfunctionsService service;

        protected void CreateMalfunctionsService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.MalfunctionsService(dbContext);
        }
    }
}
