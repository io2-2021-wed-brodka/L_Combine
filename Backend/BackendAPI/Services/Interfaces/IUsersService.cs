using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface IUsersService
    {
        IEnumerable<UserDTO> GetAllUsers();
        IEnumerable<UserDTO> GetBlockedUsers();
        UserDTO BlockUser(string userIdString);
        void UnblockUser(string userIdString);
    }
}
