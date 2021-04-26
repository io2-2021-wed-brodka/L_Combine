using ClassLibrary.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServicesTests.BikesService
{
    [TestClass]
    public class DeleteBike: BaseBikesTest
    {
        [TestInitialize]
        public void PrepareService() => CreateBikeService();

    }
}
