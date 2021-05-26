using ClassLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Malfunction
    {
        public int ID { get; set; }
        public DateTime DetectionDate { get; set; }
        public string Description { get; set; }
        public int BikeID { get; set; }
        public int ReportingUserID { get; set; }
        public MalfunctionState State { get; set; }

        public Bike Bike { get; set; }
        public User User { get; set; }
    }
}
