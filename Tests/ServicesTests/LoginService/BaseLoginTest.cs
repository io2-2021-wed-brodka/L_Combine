using BackendAPI.Helpers;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.LoginService
{
    public abstract class BaseLoginTest : BaseTest
    {
        protected BackendAPI.Services.Classes.LoginService service;

        protected void CreateLoginService()
        {
            dbContext = GetContext();
            service = new BackendAPI.Services.Classes.LoginService(dbContext,
                Options.Create(new JwtSettings() { Secret = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }));
        }
    }
}
