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
        //Właściwość potrzebna do utrzymania relacji między tabelami
        public IList<Bike> Bikes { get; set; }
        public IList<Reservation> Reservations { get; set; }
        public int BikesLimit { get; set; }
    }
}
