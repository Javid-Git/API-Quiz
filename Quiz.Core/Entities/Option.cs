using Quiz.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Entities
{
    public class Option : BaseEntity
    {
        public string Qoption { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
