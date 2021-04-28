using ClassLibrary;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibraryTests
{
    [TestClass]
    public class StringHashTests
    {
        [TestMethod]
        public void Sha256_GetHashTest()
        {
            string input = "Hello world!";
            string result;
            using (var stringHash = new StringHash() )
                result = stringHash.GetHash(input);

            Assert.IsTrue(result.Length == 64);
        }

        [TestMethod]
        public void Sha256_CompareHashesTest_ExpectedTrue()
        {
            string input = "Hello world!";
            string result1, result2;
            using (var stringHash = new StringHash())
            {
                result1 = stringHash.GetHash(input);
                result2 = stringHash.GetHash(input);

                Assert.IsTrue(stringHash.CompareHashes(result1, result2));
            }
        }

        [TestMethod]
        public void Sha256_CompareHashesTest_ExpectedFalse()
        {
            string input1 = "Hello world!", input2="Hello world1";
            string result1, result2;
            using (var stringHash = new StringHash())
            {
                result1 = stringHash.GetHash(input1);
                result2 = stringHash.GetHash(input2);

                Assert.IsFalse(stringHash.CompareHashes(result1, result2));
            }
        }
    }
}
