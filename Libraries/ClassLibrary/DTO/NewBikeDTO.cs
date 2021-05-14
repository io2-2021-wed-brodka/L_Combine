using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ClassLibrary.DTO
{
    public class NewBikeDTO
    {
        [Required]
        public string StationId { get; set; }
    }
}
