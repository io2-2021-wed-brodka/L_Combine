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
        protected TestDataContext dbContext;

        protected TestDataContext GetContext()
        {
            dbContext = TestDataContextFactory.TestData();
            return dbContext;
        }
    }
}
