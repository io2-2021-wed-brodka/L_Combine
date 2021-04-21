using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;
using BackendAPI.Repository.Interfaces;
using BackendAPI.Repository.Repositories;
using BackendAPI.Helpers;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using BackendAPI.Helpers.DTOFactories;

namespace BackendAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddScoped<IBikeRepository, BikeRepository>();
            services.AddScoped<IStationRepository, StationRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRentalRepository, RentalRepository>();
            services.AddScoped<IReservationRepository, ReservationRepository>();

            services.AddScoped<IStationDTOFactory, StationDTOFactory>();
            services.AddScoped<IReservationDTOFactory, ReservationDTOFactory>();
            services.AddScoped<IBikeDTOFactory, BikeDTOFactory>();

            services.AddDbContextPool<DataContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString(
                        "DefaultConnection")));

            // configure strongly typed settings objects
            var jwtSettingsSection = Configuration.GetSection("JwtSettings");
            services.Configure<JwtSettings>(jwtSettingsSection);

            // configure jwt authentication
            var jwtSettings = jwtSettingsSection.Get<JwtSettings>();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

           
            services
                .AddMvc(options => options.Filters.Add(new HttpResponseExceptionFilter()))
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //Porządek wywołania metod tutaj poniżej jest bardzo ważny!!!

            if (env.IsDevelopment())
            {
                app.UseExceptionHandler("/error-local-development");
            }
            else
            {
                app.UseExceptionHandler("/error");
                app.UseHsts();
            }

            app.UseStatusCodePages(async context =>
            {
                if (context.HttpContext.Response.StatusCode == 401)
                {
                    context.HttpContext.Response.ContentType = "application/json";
                    await context.HttpContext.Response.WriteAsync("{\"message\":\"Unauthorized\"}");
                }
                //Poniżej odpowiednie przerobienie pustych responsów 403
                //(pochodzących z atrybutu Authorize), by było zgodnie
                //ze specyfikacją
                else if (context.HttpContext.Response.StatusCode == 403
                && context.HttpContext.Response.ContentType == null)
                {
                    context.HttpContext.Response.ContentType = "application/json";
                    await context.HttpContext.Response.WriteAsync("{\"message\":\"Forbidden\"}");
                }
            });

            app.UseHttpsRedirection();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();

            app.UseMvc();


        }
    }
}
