using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class AuthenticateResponse
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            ID = user.ID;
            Name = user.Name;
            LastName = user.LastName;
            Login = user.Login;
            Token = token;
        }
    }
}
