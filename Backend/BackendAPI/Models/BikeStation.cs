using ClassLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class BikeStation
    {
        //Klucz główny
        public int ID { get; set; }
        public BikeStationState State { get; set; }
        public string LocationName { get; set; }

        public IList<Bike> Bikes { get; set; }
    }
}
