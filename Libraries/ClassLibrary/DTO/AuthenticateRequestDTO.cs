using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClassLibrary.DTO
{
    public class AuthenticateRequestDTO
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
