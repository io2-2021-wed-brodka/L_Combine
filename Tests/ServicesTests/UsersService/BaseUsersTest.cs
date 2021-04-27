using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.UsersService
{
    abstract public class BaseUsersTest : BaseTest
    {
        protected BackendAPI.Services.Classes.UsersService service;

        protected void CreateUsersService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.UsersService(dbContext);
        }
    }
}
