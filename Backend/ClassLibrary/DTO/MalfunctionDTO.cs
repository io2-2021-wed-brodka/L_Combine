using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.DTO
{
    public class MalfunctionDTO
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public string BikeId { get; set; }
        public string ReportingUserId { get; set; }
    }
}
