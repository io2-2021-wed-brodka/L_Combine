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
        
        public static string JoinRoles(params string[] roles)
        {
            return string.Join(",", roles);
        }
    }
}
