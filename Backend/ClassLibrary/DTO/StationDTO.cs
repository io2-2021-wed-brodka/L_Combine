using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.DTO
{
    public class StationDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int ActiveBikesCount { get; set; }
        public string Status { get; set; }
        public int BikesLimit { get; set; }
    }
}
