using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public interface IBikeRepository : IGenericRepository<Bike>
    {
        User GetUser(Bike component);
    }
}
