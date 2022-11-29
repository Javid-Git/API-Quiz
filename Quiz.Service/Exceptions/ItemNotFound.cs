using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.Exceptions
{
    public class ItemNotFound : Exception
    {
        public ItemNotFound(string msg) : base(msg)
        {

        }
    }
}
