using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public interface IUserRepository: IGenericRepository<User>
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        User Get(Bike component);
    }
}
