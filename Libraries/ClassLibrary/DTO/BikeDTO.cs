using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.DTO
{
    public class BikeDTO
    {
        public int Id { get; set; }
        public StationDTO Station { get; set; }
        public UserDTO User { get; set; }
        public BikeStatusDTO BikeStatus { get; set; }
    }
}
