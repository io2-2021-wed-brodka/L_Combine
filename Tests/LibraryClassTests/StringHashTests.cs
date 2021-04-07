using ClassLibrary;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace ClassLibraryTests
{
    [TestClass]
    class StringHashTests
    {
        [TestMethod]
        public void Sha256_GetHashTest()
        {
            string input = "Hello world!";
            string result;
            using (var sha256Hash = SHA256.Create())
                result = StringHash.GetHash(sha256Hash, input);

            Assert.IsTrue(result.Length == 64);
        }

        [TestMethod]
        public void Sha256_CompareHashesTest_ExpectedTrue()
        {
            string input = "Hello world!";
            string result1, result2;
            using (var sha256Hash = SHA256.Create())
            {
                result1 = StringHash.GetHash(sha256Hash, input);
                result2 = StringHash.GetHash(sha256Hash, input);

                Assert.IsTrue(StringHash.CompareHashes(sha256Hash, result1, result2));
            }
        }

        [TestMethod]
        public void Sha256_CompareHashesTest_ExpectedFalse()
        {
            string input1 = "Hello world!", input2="Hello world1";
            string result1, result2;
            using (var sha256Hash = SHA256.Create())
            {
                result1 = StringHash.GetHash(sha256Hash, input1);
                result2 = StringHash.GetHash(sha256Hash, input2);

                Assert.IsFalse(StringHash.CompareHashes(sha256Hash, result1, result2));
            }
        }
    }
}
