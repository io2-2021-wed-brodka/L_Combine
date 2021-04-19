using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Reservation
    {
        //Klucz główny
        public int ID { get; set; }
        public DateTime ReservationDate { get; set; }
        public DateTime ExpireDate { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int BikeId { get; set; }
        public Bike Bike { get; set; }
    }
}
