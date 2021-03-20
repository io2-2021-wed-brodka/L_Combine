using ClassLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Bike
    {
        //Klucz główny
        public int ID { get; set; }
        //Klucz obcy
        public int? BikeStationID { get; set; }
        public BikeState Bikestate { get; set; }

        public BikeStation BikeStation { get; set; }
        public ICollection<Rental> Rentals { get; set; }
    }
}
