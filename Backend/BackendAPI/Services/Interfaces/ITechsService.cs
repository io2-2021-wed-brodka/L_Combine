using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface ITechsService
    {
        IEnumerable<UserDTO> GetAllTechs();
        UserDTO GetTech(string techIdString);
        UserDTO AddTech(string login, string password);
        void DeleteTech(string techIdString);
    }
}
