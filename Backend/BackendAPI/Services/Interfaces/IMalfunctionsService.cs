using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface IMalfunctionService
    {
        IEnumerable<MalfunctionDTO> GetMalfunctions();
    }
}
