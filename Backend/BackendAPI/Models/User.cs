using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class User
    {
        //Klucz główny
        public int ID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }

        public ICollection<Rental> Rentals { get; set; }
    }
}
