using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        //Właściwość potrzebna do utrzymania relacji między tabelami
        public IList<Rental> Rentals { get; set; }

        public string Role {get; set;}

        public string Login { get; set; }
        [JsonIgnore] //żeby przy serializacji do jsona się nie serializowało]  
        public string PasswordHash { get; set; }

        public bool Blocked { get; set; }

        public IList<Reservation> Reservations { get; set; }
        public IList<Malfunction> Malfunctions { get; set; }
    }
}
