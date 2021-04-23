using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface ILoginService
    {
        AuthenticateResponseDTO Login(string login, string password);
        AuthenticateResponseDTO Register(string login, string password);
    }
}
