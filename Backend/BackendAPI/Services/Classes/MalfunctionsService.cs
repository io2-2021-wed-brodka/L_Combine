using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class MalfunctionsService : Service, IMalfunctionsService
    {
        [ActivatorUtilitiesConstructor]
        public MalfunctionsService(DataContext dbContext) : base(dbContext)
        {
        }

        public MalfunctionsService(TestDataContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<MalfunctionDTO> GetMalfunctions()
        {
            return dbContext.Malfunctions.ToList()
                .Select(m => CreateMalfunctionDTO(m));
        }

        public MalfunctionDTO ReportMalfunction(string userIdString, string bikeIdString, string description)
        {
            int userId = ParseUserId(userIdString);
            int bikeId = ParseBikeId(bikeIdString);

            if ((dbContext.Bikes.FirstOrDefault(b => b.ID == bikeId)) == null)
                throw new HttpResponseException("Bike not found", 404);

            var rental =
                (from r in dbContext.Rentals
                 where r.BikeID == bikeId
                 && r.UserID == userId
                 && r.EndDate == null
                 select r).FirstOrDefault();

            if (rental == null)
                throw new HttpResponseException("Bike is not rented by calling user", 422);

            var malfunction = new Malfunction()
            {
                BikeID = bikeId,
                Description = description,
                DetectionDate = DateTime.Now,
                ReportingUserID = userId,
                State = ClassLibrary.MalfunctionState.NotFixed
            };

            dbContext.Malfunctions.Add(malfunction);
            dbContext.SaveChanges();

            return CreateMalfunctionDTO(malfunction);
        }

        public void DeleteMalfunction(string malfunctionIdString)
        {
            int malfunctionId = ParseMalfunctionId(malfunctionIdString);
            Malfunction malfunction;
            if ((malfunction = dbContext.Malfunctions.FirstOrDefault(m => m.ID == malfunctionId)) == null)
                throw new HttpResponseException("Malfunction not found", 404);
            dbContext.Malfunctions.Remove(malfunction);
            dbContext.SaveChanges();
        }
    }
}
