﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class AuthenticateResponse
    {
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
