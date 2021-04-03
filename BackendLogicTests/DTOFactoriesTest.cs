using BackendAPI.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BackendLogicTests
{
    [TestClass]
    public class DTOFactoriesTest
    {
        private Bike GenerateWorkingRentedBike()
        {
            return new Bike()
            {
                BikeStationID = 2,
                ID = 23,
                State = ClassLibrary.BikeState.Working,
                BikeStation = null
            };
        }

        private User GenerateUser()
        {

        }

        [TestMethod]
        public void BikeFactory_WorkingRented()
        {
            var bike = GenerateWorkingRentedBike();

            var result = BikeDTOFactory.CreateBike();
        }
    }
}
