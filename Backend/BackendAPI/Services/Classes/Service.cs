using ClassLibrary.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Services.Classes
{
    public abstract class Service
    {
        protected int ParseUserId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("User not found", 404);
            return result;
        }

        protected int ParseStationId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("Station not found", 404);
            return result;
        }

        protected int ParseBikeId(string id)
        {
            if (!int.TryParse(id, out int result))
                throw new HttpResponseException("Bike not found", 404);
            return result;
        }
    }
}
