using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.TechsService
{
    [TestClass]
    public class AddTechTest : BaseTechsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateTechsService();
    }
}
