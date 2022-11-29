using AutoMapper;
using Quiz.Core.Entities;
using Quiz.Entities;
using Quiz.Service.DTOs.OptionDTOs;
using Quiz.Service.DTOs.ParticipantDTOs;
using Quiz.Service.DTOs.QuestionDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Service.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<QuestionCreateDTO, Question>()
               .ForMember(des => des.CreatedAt, src => src.MapFrom(s => DateTime.UtcNow.AddHours(4)));
            CreateMap<Question, QuestionListDTO>();
            CreateMap<Question, QuestionGetDTO>()
               .ForMember(des => des.Qtext, src => src.MapFrom(s => s.Qtext));

            CreateMap<OptionCreateDTO, Option>()
               .ForMember(des => des.CreatedAt, src => src.MapFrom(s => DateTime.UtcNow.AddHours(4)));
            CreateMap<Option, OptionListDTO>()
               .ForMember(des => des.QuestionId, src => src.MapFrom(s => s.Id));

            CreateMap<Option, OptionGetDTO>()
               .ForMember(des => des.Qoption, src => src.MapFrom(s => s.Qoption));

            CreateMap<ParticipantCreateDTO, Participant>()
               .ForMember(des => des.CreatedAt, src => src.MapFrom(s => DateTime.UtcNow.AddHours(4)));
            CreateMap<Participant, ParticipantListDTO>();
            CreateMap<Participant, ParticipantGetDTO>();
        }

    }

}
