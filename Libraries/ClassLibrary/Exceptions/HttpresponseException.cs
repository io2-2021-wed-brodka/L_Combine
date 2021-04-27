using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.Exceptions
{
    /// <summary>
    /// Własne exception , które zostaje odfiltrowane za pomocą HttpResponseExceptionFilter.
    /// Wpływa na zwracany wynik przy wystąpieniu wyjątku.
    /// Przy innym typie wyjątków zwrócony jest JSON z obiektem klasy ProblemDetails.
    /// </summary>
    public class HttpResponseException : Exception
    {
        public HttpResponseException(string message, int status = 500): base(message)
        {
            Status = status;
            Value = message;
        }

        public int Status { get; set; } = 500;

        private object val;
        public object Value
        {
            get => val;
            set => val = new { Message = value };
        }
    }
}
