using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.ReservationsService
{
    abstract public class BaseReservationsTest : BaseTest
    {
        protected BackendAPI.Services.Classes.ReservationsService service;

        protected void CreateReservationsService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.ReservationsService(dbContext);
        }
    }
}
