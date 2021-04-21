using BackendAPI.Helpers.DTOFactories;
using BackendAPI.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace BackendLogicTests
{
    [TestClass]
    public class BikeDTOFactoryTest
    {
        private Bike GenerateWorkingRentedBike()
        {
            return new Bike()
            {
                ID = 23,
                State = ClassLibrary.BikeState.Working,
                BikeStation = null
            };
        }

        private Bike GenerateWorkingDockedBike()
        {
            return new Bike()
            {
                BikeStationID = 24,
                ID = 23,
                State = ClassLibrary.BikeState.Working,
                BikeStation = new BikeStation()
                {
                    ID = 24,
                    Bikes = new List<Bike>(),
                    LocationName = "Wolumen",
                    State = ClassLibrary.BikeStationState.Working
                }
            };
        }

        private Bike GenerateBlockedDockedBike()
        {
            return new Bike()
            {
                BikeStationID = 24,
                ID = 23,
                State = ClassLibrary.BikeState.Blocked,
                BikeStation = new BikeStation()
                {
                    ID = 24,
                    Bikes = new List<Bike>(),
                    LocationName = "Wolumen",
                    State = ClassLibrary.BikeStationState.Working
                }
            };
        }

        private Bike GenerateInServiceBike()
        {
            return new Bike()
            {
                ID = 23,
                State = ClassLibrary.BikeState.InService,
            };
        }

        private User GenerateUser()
        {
            return new User()
            {
                ID = 24,
                Name = "Maria",
                LastName = "Ró¿alska",
            };
        }

        [TestMethod]
        public void BikeFactory_WorkingRented()
        {
            var bike = GenerateWorkingRentedBike();
            var user = GenerateUser();

            var result = BikeDTOFactory.Create(bike, user, false);

            bool check = result.Id == bike.ID.ToString() &&
                               result.Station == null &&
                               result.User != null &&
                               result.BikeStatus == ClassLibrary.DTO.BikeStatusDTO.Rented;
            Assert.IsTrue(check);
        }

        [TestMethod]
        public void BikeFactory_StationAvailable()
        {
            var bike = GenerateWorkingDockedBike();

            var result = BikeDTOFactory.Create(bike, null, false);

            bool check = result.Id == bike.ID.ToString() &&
                               result.Station != null &&
                               result.User == null &&
                               result.BikeStatus == ClassLibrary.DTO.BikeStatusDTO.Available;
            Assert.IsTrue(check);
        }

        [TestMethod]
        public void BikeFactory_BlockedStation()
        {
            var bike = GenerateBlockedDockedBike();

            var result = BikeDTOFactory.Create(bike, null, false);

            bool check = result.Id == bike.ID.ToString() &&
                               result.Station != null &&
                               result.User == null &&
                               result.BikeStatus == ClassLibrary.DTO.BikeStatusDTO.Blocked;
            Assert.IsTrue(check);
        }

        [TestMethod]
        public void BikeFactory_BlockedInService()
        {
            var bike = GenerateInServiceBike();

            var result = BikeDTOFactory.Create(bike, null, false);

            bool check = result.Id == bike.ID.ToString() &&
                               result.Station == null &&
                               result.User == null &&
                               result.BikeStatus == ClassLibrary.DTO.BikeStatusDTO.Blocked;
            Assert.IsTrue(check);
        }
    }
}
