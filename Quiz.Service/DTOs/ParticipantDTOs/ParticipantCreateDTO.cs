using Quiz.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.DTOs.ParticipantDTOs
{
    public class ParticipantCreateDTO : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
