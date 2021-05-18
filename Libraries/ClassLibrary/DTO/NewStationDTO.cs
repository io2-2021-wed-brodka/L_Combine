using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClassLibrary.DTO
{
    public class NewStationDTO
    {
        [Required]
        public string Name { get; set; }
        public int? BikesLimit { get; set; }
    }
}
