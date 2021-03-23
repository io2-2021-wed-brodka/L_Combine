using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Rental
    {
        //Klucz główny
        public int ID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        //Klucz obcy
        public int BikeID { get; set; }
        //Klucz obcy
        public int UserID { get; set; }
        //Właściwości potrzebne do utrzymania relacji między tabelami
        public Bike Bike { get; set; }
        public User User { get; set; }
    }
}
