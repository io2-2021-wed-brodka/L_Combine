using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Threading.Tasks;
using System.Globalization;

namespace BackendAPI
{
    public static class ResMng
    {
        private static ResourceManager Manager { get; set; } = new ResourceManager("BackendAPI.Resource", Assembly.GetExecutingAssembly());
        public static string GetResource(string resourceId)
        {
             return Manager.GetString(resourceId);
        }
    }
}
