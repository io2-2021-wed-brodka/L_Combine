using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.TechsService
{
    [TestClass]
    public class GetAllTechsTest : BaseTechsTest
    {
        [TestInitialize]
        public void PrepareService() => CreateTechsService();
    }
}
