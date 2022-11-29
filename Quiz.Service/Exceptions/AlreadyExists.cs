using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.Exceptions
{
    public class AlreadyExists : Exception
    {
        public AlreadyExists(string msg) : base(msg)
        {

        }
    }
}
