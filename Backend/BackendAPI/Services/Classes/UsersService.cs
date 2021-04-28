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
    public class UsersService : Service, IUsersService
    {
        [ActivatorUtilitiesConstructor]
        public UsersService(DataContext dbContext) : base(dbContext)
        {
        }

        public UsersService(TestDataContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return dbContext.Users.Where(u => u.Role == Role.User)
                .ToList().Select(u => CreateUserDTO(u));
        }

        public IEnumerable<UserDTO> GetBlockedUsers()
        {
            return dbContext.Users.Where(u => u.Blocked && u.Role == Role.User).ToList()
                .Select(u => CreateUserDTO(u));
        }


        //[TEST]
        public UserDTO BlockUser(string userIdString)
        {
            int userId = ParseUserId(userIdString);

            User user;
            if ((user = dbContext.Users
                .FirstOrDefault(u => u.ID == userId && u.Role == Role.User)) == null)
                throw new HttpResponseException("User not found", 404);

            if (user.Blocked)
                throw new HttpResponseException("User already blocked", 422);

            var userReservations = dbContext.Reservations
                .Where(r => r.UserID == userId).ToList();

            user.Blocked = true;
            //Usunięcie wszystkich rezerwacji usera (w szczególności tych aktywnych)
            dbContext.Reservations.RemoveRange(userReservations);
            dbContext.SaveChanges();

            return CreateUserDTO(user);
        }


        //[TEST]
        public void UnblockUser(string userIdString)
        {
            int userId = ParseUserId(userIdString);

            User user;
            if ((user = dbContext.Users
                .FirstOrDefault(u => u.ID == userId && u.Role == Role.User)) == null)
                throw new HttpResponseException("User not found", 404);

            if (!user.Blocked)
                throw new HttpResponseException("User not blocked", 422);

            user.Blocked = false;
            dbContext.SaveChanges();
        }
    }
}
