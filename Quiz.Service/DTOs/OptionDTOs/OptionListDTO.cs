using Quiz.Core.Entities;
using Quiz.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.DTOs.OptionDTOs
{
    public class OptionListDTO : BaseEntity
    {
        public string Qoption { get; set; }
        public int QuestionId { get; set; }
    }
}
