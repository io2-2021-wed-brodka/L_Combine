using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.Exceptions
{
    public class HttpResponseException : Exception
    {
        public int Status { get; set; } = 500;

        private object val;
        public object Value
        {
            get => $"Error {Status}: " + val;
            set => val = value;
        }
    }
}
