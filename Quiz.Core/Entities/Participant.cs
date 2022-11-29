using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Core.Entities
{
    public class Participant : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public double Score { get; set; }
        public int Time { get; set; }
    }
}
