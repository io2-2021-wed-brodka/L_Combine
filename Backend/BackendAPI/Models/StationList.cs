using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class StationList
    {
        public IList<BikeStation> Stations { get; set; }
    }
}
