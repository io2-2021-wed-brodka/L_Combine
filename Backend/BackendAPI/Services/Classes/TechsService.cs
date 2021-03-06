using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using ClassLibrary;
using ClassLibrary.DTO;
using ClassLibrary.Exceptions;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class TechsService : Service, ITechsService
    {
        [ActivatorUtilitiesConstructor]
        public TechsService(DataContext dbContext) : base(dbContext)
        {
        }

        public TechsService(TestDataContext dbContext) : base(dbContext)
        {
        }

        public UserDTO AddTech(string login, string password)
        {
            if (dbContext.Users.Where(u => u.Login == login).Any())
                throw new HttpResponseException(ResMng.GetResource("LoginExists"), 409);

            User tech;
            using (StringHash stringHash = new StringHash())
            {
                tech = new User()
                {
                    Login = login,
                    PasswordHash = stringHash.GetHash(password),
                    Name = "ROZSZERZYC_REJESTRACJE",
                    LastName = "ROZSZERZYC_REJESTRACJE",
                    Role = Role.Tech
                };
            }
            //Dodaj uzytkownika do bazy
            dbContext.Add(tech);
            dbContext.SaveChanges();
            //tech dostal już nowe id
            return CreateUserDTO(tech);
        }

        public void DeleteTech(string techIdString)
        {
            int techId = ParseTechId(techIdString);

            User tech;
            if ((tech = dbContext.Users
                .FirstOrDefault(u => u.ID == techId && u.Role == Role.Tech)) == null)
                throw new HttpResponseException(ResMng.GetResource("TechNotFound"), 404);

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
                throw new HttpResponseException(ResMng.GetResource("TechNotFound"), 404);

            return CreateUserDTO(tech);
        }
    }
}
