using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace BackendAPI.Controllers
{
    /// <summary>
    /// Kontroler do obsługi wyjątków.
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        /// <summary>
        /// Obsługa błędów przy pracy deweloperskiej.
        /// Dodatkowo do wersji produkcyjne dołaczany jest stos.
        /// </summary>
        /// <param name="webHostEnvironment"></param>
        /// <returns></returns>
        [Route("/error-local-development")]
        public IActionResult ErrorLocalDevelopment(
        [FromServices] IHostingEnvironment webHostEnvironment)
        {
            if (!webHostEnvironment.IsDevelopment())
            {
                throw new InvalidOperationException(
                    "This shouldn't be invoked in non-development environments.");
            }

            var feature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            var ex = feature?.Error;

            var problemDetails = new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Instance = feature?.Path,
                Title = ex.GetType().Name,
                Detail = ex.StackTrace,
            };

            return StatusCode(problemDetails.Status.Value, problemDetails);
        }

        /// <summary>
        /// Obsługa błędów przy pracy na produkcji.
        /// </summary>
        /// <param name="webHostEnvironment"></param>
        /// <returns></returns>
        [Route("/error")]
        public ActionResult Error([FromServices] IHostingEnvironment webHostEnvironment)
        {
            var feature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            var ex = feature?.Error;
            var isDev = webHostEnvironment.IsDevelopment();
            var problemDetails = new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Instance = feature?.Path,
                Title = isDev ? $"{ex.GetType().Name}: {ex.Message}" : "An error occurred.",
                Detail = isDev ? ex.StackTrace : null,
            };

            return StatusCode(problemDetails.Status.Value, problemDetails);
        }
    }
}
