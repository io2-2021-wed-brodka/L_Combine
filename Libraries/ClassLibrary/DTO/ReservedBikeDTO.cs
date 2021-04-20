using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.DTO
{
    public class ReservedBikeDTO
    {
        public string BikeID { get; set; }
        public StationDTO Station { get; set; }

        public DateTime ReservedAt { get; set; }
        public DateTime ReservedTill { get; set; }
    }
}
