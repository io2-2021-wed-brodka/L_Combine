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

        public BikeState State { get; set; }
        //Właściwości potrzebne do utrzymania relacji między tabelami
        public BikeStation BikeStation { get; set; }
        public IList<Rental> Rentals { get; set; }

        public IList<Reservation> Reservations { get; set; }
        public IList<Malfunction> Malfunctions { get; set; }
    }
}
