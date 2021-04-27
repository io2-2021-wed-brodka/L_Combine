using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface ILoginService
    {
        LoginResponseDTO Login(string login, string password);
        RegisterResponseDTO Register(string login, string password);
    }
}
