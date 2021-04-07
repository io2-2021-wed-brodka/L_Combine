//https://docs.microsoft.com/pl-pl/dotnet/api/system.security.cryptography.hashalgorithm.computehash?view=net-5.0

using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace ClassLibrary
{
    public static class StringHash
    {
        public static string GetHash(HashAlgorithm hashAlgorithm, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        public static bool CompareHashes(HashAlgorithm hashAlgorithm, string hash1, string hash2)
        {
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            return comparer.Compare(hash1, hash2) == 0;
        }
    }
}
