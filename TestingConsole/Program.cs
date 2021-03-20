//using BackendAPI.Repository;
using BackendAPI.Repository.Interfaces;
using BackendAPI.Repository.Repositories;
using System;

namespace TestingConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            IGenericRepository<int> r= new GenericRepository<int>();

            var res = r.Insert(5);

            Console.WriteLine("Hello World!");
        }
    }
}
