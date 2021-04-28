using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Reflection;
using System.Text;

namespace ServicesTests
{

    /// <summary>
    /// Przerobiona klasa z oryginalnego frameworka
    /// https://github.com/microsoft/testfx/blob/master/src/TestFramework/MSTest.Core/Attributes/ExpectedExceptionAttribute.cs
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public sealed class ExpectedExceptionMessageAttribute : ExpectedExceptionBaseAttribute
    {
        private string exceptionMessage;

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ExpectedExceptionMessageAttribute"/> class with the expected type
        /// </summary>
        /// <param name="exceptionType">Type of the expected exception</param>
        public ExpectedExceptionMessageAttribute(Type exceptionType, string exceptionMessage)
            : this(exceptionType, exceptionMessage, string.Empty)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ExpectedExceptionMessageAttribute"/> class with
        /// the expected type and the message to include when no exception is thrown by the test.
        /// </summary>
        /// <param name="exceptionType">Type of the expected exception</param>
        /// <param name="noExceptionMessage">
        /// Message to include in the test result if the test fails due to not throwing an exception
        /// </param>
        public ExpectedExceptionMessageAttribute(Type exceptionType, string exceptionMessage, string noExceptionMessage)
            : base(noExceptionMessage)
        {
            if (exceptionType == null)
            {
                throw new ArgumentNullException(nameof(exceptionType));
            }

            if (!typeof(Exception).GetTypeInfo().IsAssignableFrom(exceptionType.GetTypeInfo()))
            {
                throw new ArgumentException(
                        "Podana klasa musi dziedziczyc z Exception",
                        nameof(exceptionType));
            }

            this.ExceptionType = exceptionType;
            this.exceptionMessage = exceptionMessage;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets a value indicating the Type of the expected exception
        /// </summary>
        public Type ExceptionType
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether to allow types derived from the type of the expected exception to
        /// qualify as expected
        /// </summary>
        public bool AllowDerivedTypes
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the message to include in the test result if the test fails due to not throwing an exception
        /// </summary>
        protected override string NoExceptionMessage
        {
            get
            {
                return string.Format(
                    CultureInfo.CurrentCulture,
                    "Nie został wyrzucony wyjątek {0}: {1}",
                    this.ExceptionType.FullName,
                    this.SpecifiedNoExceptionMessage);
            }
        }

        #endregion

        #region Methods

        /// <summary>
        /// Verifies that the type of the exception thrown by the unit test is expected
        /// </summary>
        /// <param name="exception">The exception thrown by the unit test</param>
        protected override void Verify(Exception exception)
        {
            Debug.Assert(exception != null, "'exception' is null");

            Type thrownExceptionType = exception.GetType();
            if (this.AllowDerivedTypes)
            {
                if (!this.ExceptionType.GetTypeInfo().IsAssignableFrom(thrownExceptionType.GetTypeInfo())
                     || exception.Message != exceptionMessage)
                {
                    // If the exception is an AssertFailedException or an AssertInconclusiveException, then re-throw it to
                    // preserve the test outcome and error message
                    this.RethrowIfAssertException(exception);

                    string message = string.Format(
                        CultureInfo.CurrentCulture,
                        "Został zgłoszony wyjątek {0}, powinien byc {1}.\nWiadomość otrzymana: {2}, powinna być {3}.",
                        thrownExceptionType.FullName,
                        this.ExceptionType.FullName,
                        exception.Message,
                        exceptionMessage);
                    throw new Exception(message);
                }
            }
            else
            {
                if (thrownExceptionType != this.ExceptionType || exception.Message != exceptionMessage)
                {
                    // If the exception is an AssertFailedException or an AssertInconclusiveException, then re-throw it to
                    // preserve the test outcome and error message
                    this.RethrowIfAssertException(exception);

                    string message = string.Format(
                        CultureInfo.CurrentCulture,
                        "Został zgłoszony wyjątek {0}, powinien byc {1}.\nWiadomość otrzymana: {2}, powinna być {3}.",
                        thrownExceptionType.FullName,
                        this.ExceptionType.FullName,
                        exception.Message,
                        exceptionMessage);
                    throw new Exception(message);
                }
            }
        }

        #endregion
    }
}
