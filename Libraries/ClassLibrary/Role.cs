using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary
{
    public static class Role
    {
        public const string User = "User";
        public const string Tech = "Tech";
        public const string Admin = "Admin";
        //Pomocnicze pole dla Authorize w przypadku kilku ról
        public const string AdminTech = Admin + "," + Tech;
    }
}
