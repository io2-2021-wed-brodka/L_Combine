using BackendAPI;
using BackendAPI.Data;
using BackendAPI.Models;
using ClassLibrary;
using ClassLibrary.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class NotForBlockedAttribute: Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
    //Świetna sprawa z tym pozyskaniem dbContextu
    //https://stackoverflow.com/questions/63100180/inject-database-context-into-custom-attribute-net-core
        var dbContext = context.HttpContext
            .RequestServices
            .GetService(typeof(DataContext)) as DataContext;
        int userId = int.Parse(context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        var user = dbContext.Users.FirstOrDefault(u => u.ID == userId);
        if (user == null)
            return; //To nie powinno się zdarzyć, ale na wszelki wypadek piszę
        if (user.Role == Role.User && user.Blocked)
            context.Result = new JsonResult(new { Message = ResMng.GetResource("UserBlocked") }) { StatusCode = 403 };
    }
}

