using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClassLibrary.DTO
{
    public class IdDTO
    {
        [Required]
        public string Id { get; set; }
    }
}
