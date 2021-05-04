using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class TechsService : Service, ITechsService
    {
        public TechsService(CommonDataContext dbContext) : base(dbContext)
        {
        }

        public UserDTO AddTech(string login, string password)
        {
            throw new NotImplementedException();
        }

        public void DeleteTech(string techIdString)
        {
            int techId = ParseTechId(techIdString);

            User tech;
            if ((tech = dbContext.Users
                .FirstOrDefault(u => u.ID == techId && u.Role == Role.Tech)) == null)
                throw new HttpResponseException("Tech not found", 404);

            //TODO: W przyszłości byc moze jak już będą usterki
            //to trzeba bedzie coś dopisać
            //[TODO]
            dbContext.Users.Remove(tech);
            dbContext.SaveChanges();
        }

        public IEnumerable<UserDTO> GetAllTechs()
        {
            return dbContext.Users.Where(u => u.Role == Role.Tech)
                .ToList().Select(u => CreateUserDTO(u));
        }

        public UserDTO GetTech(string techIdString)
        {
            int techId = ParseTechId(techIdString);

            User tech;
            if ((tech = dbContext.Users
                .FirstOrDefault(u => u.ID == techId && u.Role == Role.Tech)) == null)
                throw new HttpResponseException("Tech not found", 404);

            return CreateUserDTO(tech);
        }
    }
}
