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

        public int UserID { get; set; }
        public User User { get; set; }

        public int BikeID { get; set; }
        public Bike Bike { get; set; }

        public Reservation(User user, Bike bike, int expireMinutes = 30)
        {
            ReservationDate = DateTime.Now;
            ExpireDate = DateTime.Now.AddMinutes(expireMinutes);
            UserID = user.ID;
            BikeID = bike.ID;
        }
    }
}
