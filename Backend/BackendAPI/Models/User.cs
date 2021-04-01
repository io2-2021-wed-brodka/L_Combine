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

        public string Login { get; set; }
        [JsonIgnore] //żeby przy serializacji do jsona się nie serializowało]  
        public string Password { get; set; }
    }
}
