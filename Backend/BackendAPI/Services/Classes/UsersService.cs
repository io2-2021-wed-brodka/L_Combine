using BackendAPI.Data;
using BackendAPI.Services.Interfaces;
using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class UsersService : Service, IUsersService
    {
        public UsersService(DataContext dbContext) : base(dbContext)
        {
        }

        public UserDTO BlockUser(string userIdString)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserDTO> GetBlockedUsers()
        {
            throw new NotImplementedException();
        }

        public void UnblockUser(string userIdString)
        {
            throw new NotImplementedException();
        }
    }
}
