using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassLibrary.DTO
{
    public class ErrorDTO
    {
        public string Message { get; set; }
        public ErrorDTO(string message)
        {
            Message = message;
        }
    }
}
