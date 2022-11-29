using AutoMapper;
using Quiz.Core;
using Quiz.Entities;
using Quiz.Service.DTOs.OptionDTOs;
using Quiz.Service.DTOs.QuestionDTOs;
using Quiz.Service.Exceptions;
using Quiz.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Service.Implementations
{
    public class ManageQuestionService : IManageQuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ManageQuestionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task CreateAsync(QuestionCreateDTO questionCreateDTO)
        {
            Question question = _mapper.Map<Question>(questionCreateDTO);
            if (await _unitOfWork.QuestionRepository.IsExistAsync(c => c.Qtext.ToLower() == questionCreateDTO.Qtext.Trim().ToLower()))
            {
                throw new AlreadyExists($"Size {questionCreateDTO.Qtext} already Exists");
            }
            question.Qtext = questionCreateDTO.Qtext;

            await _unitOfWork.QuestionRepository.AddAsync(question);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IQueryable<QuestionListDTO>> DeleteAsync(int id)
        {
            Question question = await _unitOfWork.QuestionRepository.GetAsync(c => !c.IsDeleted && c.Id == id);

            if (question == null)
                throw new ItemNotFound($"Item not found");

            List<Option> options = _unitOfWork.OptionRepository.GetAllAsync(c => !c.IsDeleted && c.Id == id).Result;
            foreach (var option in options)
            {
                option.IsDeleted = true;
                option.DeletedAt = DateTime.UtcNow.AddHours(4);
            }
            
            question.IsDeleted = true;
            question.DeletedAt = DateTime.UtcNow.AddHours(4);

            await _unitOfWork.CommitAsync();
            List<QuestionListDTO> colorListVMs = _mapper.Map<List<QuestionListDTO>>(_unitOfWork.QuestionRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
            IQueryable<QuestionListDTO> query = colorListVMs.AsQueryable();

            return query;
        }

        public async Task<List<QuestionListDTO>> GetAllAysnc(/*int? status*/)
        {
            List<QuestionListDTO> questionListDTO = _mapper.Map<List<QuestionListDTO>>(_unitOfWork.QuestionRepository.GetAllAsyncInclude(r => r.IsDeleted || !r.IsDeleted, "Qoptions").Result);
            //List<QuestionListDTO> query = questionListDTO.AsQueryable();

            //if (status != null && status > 0)
            //{
            //    if (status == 1)
            //    {
            //        query = query.Where(c => c.IsDeleted);
            //    }
            //    else if (status == 2)
            //    {
            //        query = query.Where(b => !b.IsDeleted);
            //    }
            //}
            //List<QuestionListDTO> randQuestions = questionListDTO.Select(x => new QuestionListDTO
            //{
            //    Id = x.Id,
            //    Qtext = x.Qtext,
            //    Qimage = x.Qimage,
            //    Qoptions = x.Qoptions.Where(o=>o.QuestionId == x.Id).ToList(),
            //    IsDeleted = x.IsDeleted,
            //    UpdatedAt = x.UpdatedAt,
            //    DeletedAt = x.DeletedAt,
            //    CreatedAt = x.CreatedAt
                
            //}).OrderBy(x=>Guid.NewGuid()).Take(5).ToList();

            return questionListDTO;
        }

        public async Task<QuestionGetDTO> GetById(int id)
        {
            Question question = await _unitOfWork.QuestionRepository.GetAsync(c => (!c.IsDeleted || c.IsDeleted) && c.Id == id);

            if (question == null)
            {
                throw new ItemNotFound($"Item not found");

            }
            QuestionGetDTO sizeGetVM = _mapper.Map<QuestionGetDTO>(question);

            return sizeGetVM;
        }

        public async Task<IQueryable<QuestionListDTO>> RestoreAsync(int id)
        {
            Question question = await _unitOfWork.QuestionRepository.GetAsync(c => c.IsDeleted && c.Id == id);

            if (question == null)
            {
                throw new ItemNotFound($"Item not found");
            }

            question.IsDeleted = false;
            question.DeletedAt = null;

            await _unitOfWork.CommitAsync();
            List<QuestionListDTO> colorListVMs = _mapper.Map<List<QuestionListDTO>>(_unitOfWork.QuestionRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
            IQueryable<QuestionListDTO> query = colorListVMs.AsQueryable();

            return query;
        }

        public async Task UpdateAsync(int id, QuestionUpdateDTO questionUpdateDTO)
        {
            Question question = await _unitOfWork.QuestionRepository.GetAsync(c => !c.IsDeleted && c.Id == id || c.IsDeleted);

            if (question == null)
            {
                throw new ItemNotFound($"Item not found");
            }


            if (await _unitOfWork.QuestionRepository.IsExistAsync(c => c.Qtext.ToLower() == questionUpdateDTO.Qtext.Trim().ToLower()))
            {
                if (question.Qtext == questionUpdateDTO.Qtext)
                {
                    question.Qtext = questionUpdateDTO.Qtext;

                    question.UpdatedAt = DateTime.UtcNow.AddHours(4);

                    await _unitOfWork.CommitAsync();
                }
                else
                {
                    throw new AlreadyExists($"Size {questionUpdateDTO.Qtext} already Exists");
                }
            }
            question.Qtext = questionUpdateDTO.Qtext;


            question.UpdatedAt = DateTime.UtcNow.AddHours(4);

            await _unitOfWork.CommitAsync();
        }
    }
}
