using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.DTO
{
    public class AuthenticateResponseDTO
    {
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
