using ClassLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Bike
    {
        public int ID { get; set; }
        public int? StationId { get; set; }
        public BikeState Bikestate { get; set; }
    }
}
