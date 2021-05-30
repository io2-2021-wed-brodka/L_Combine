using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ClassLibrary.DTO
{
    public class NewMalfunctionDTO
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
