using Quiz.Core.Entities;
using Quiz.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.DTOs.QuestionDTOs
{
    public class QuestionListDTO : BaseEntity
    {
        public string Qtext { get; set; }
        public string Qimage { get; set; }
        public List<Option> Qoptions{ get; set; }

    }
}
