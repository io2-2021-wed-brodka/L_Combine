using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Rental
    {
        //Klucz podstawowy
        public int ID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        //Klucz obcy
        public int BikeID { get; set; }
        public Bike Bike { get; set; }
        //Klucz obcy
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
