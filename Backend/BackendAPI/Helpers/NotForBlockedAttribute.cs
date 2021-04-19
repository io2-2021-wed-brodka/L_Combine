using BackendAPI.Models;
using BackendAPI.Repository.Interfaces;
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
        var blocked = context.HttpContext.User?.FindFirstValue("Blocked");
        if (blocked == bool.TrueString)
            context.Result = new JsonResult(new { Message = "User has been blocked" }) { StatusCode = 403 };
    }
}

