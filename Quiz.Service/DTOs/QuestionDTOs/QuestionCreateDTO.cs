using Quiz.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.DTOs.QuestionDTOs
{
    public class QuestionCreateDTO : BaseEntity
    {
        public string Qtext { get; set; }
        public string Qimage { get; set; }
    }
}
