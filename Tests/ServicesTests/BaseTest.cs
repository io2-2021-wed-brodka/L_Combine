using BackendAPI.Data;
using System;
using ClassLibrary.Exceptions;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ServicesTests
{
    public class BaseTest
    {
        protected DataContext GetContext() => DataContextFactory.TestData();
    }
}
