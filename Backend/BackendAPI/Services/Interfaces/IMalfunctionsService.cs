using ClassLibrary.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface IMalfunctionsService
    {
        IEnumerable<MalfunctionDTO> GetMalfunctions();
        MalfunctionDTO ReportMalfunction(string userIdString, string bikeIdString, string description);
        void DeleteMalfunction(string malfunctionIdString);
    }
}
