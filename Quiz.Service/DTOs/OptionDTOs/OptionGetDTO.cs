using Quiz.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.DTOs.OptionDTOs
{
    public class OptionGetDTO : BaseEntity
    {
        public string Qoption { get; set; }
        public int QuestionId { get; set; }
    }
}
