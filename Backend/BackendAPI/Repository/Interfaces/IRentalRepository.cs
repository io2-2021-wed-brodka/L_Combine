using BackendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Repository.Interfaces
{
    public interface IRentalRepository: IGenericRepository<Rental>
    {
        Rental FindActiveRental(int bikeId, int userId, IncludeData<Rental> includeFilter = null);
        IList<Rental> FindActiveRentals(int userId, IncludeData<Rental> includeFilter = null);
    }
}
