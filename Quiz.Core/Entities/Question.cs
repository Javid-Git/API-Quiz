using Quiz.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Entities
{
    public class Question: BaseEntity
    {
        public string Qtext { get; set; }
        public string Qimage { get; set; }
        public List<Option> Qoptions { get; set; }

    }
}
