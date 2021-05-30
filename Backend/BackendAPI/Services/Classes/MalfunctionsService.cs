using BackendAPI.Data;
using BackendAPI.Services.Interfaces;
using ClassLibrary.DTO;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public class MalfunctionsService : Service, IMalfunctionsService
    {
        [ActivatorUtilitiesConstructor]
        public MalfunctionsService(DataContext dbContext) : base(dbContext)
        {
        }

        public MalfunctionsService(TestDataContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<MalfunctionDTO> GetMalfunctions()
        {
            return dbContext.Malfunctions.ToList()
                .Select(m => CreateMalfunctionDTO(m));
        }
    }
}
