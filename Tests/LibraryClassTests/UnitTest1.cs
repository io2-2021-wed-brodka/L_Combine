using ClassLibrary;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ClassLibraryTests
{
    [TestClass]
    public class UnitTest1
    {
        //Ta metoda sluzy tylko i wylacznie do sprawdzenia, czy automatyczne testy na githubie przechodza.
        //Mozna ja wyciac gdy doda sie legitne testy.
        [TestMethod]
        public void ZeroIsZero()
        {

            Assert.AreEqual(0, 0);
        }
    }
}
