using Quiz.Service.DTOs.QuestionDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Service.Interfaces
{
    public interface IManageQuestionService
    {
        Task CreateAsync(QuestionCreateDTO optionCreateDTO);
        Task<List<QuestionListDTO>> GetAllAysnc(/*int? status*/);
        Task<QuestionGetDTO> GetById(int id);
        Task UpdateAsync(int id, QuestionUpdateDTO optionUpdateVM);
        Task<IQueryable<QuestionListDTO>> DeleteAsync(int id);
        Task<IQueryable<QuestionListDTO>> RestoreAsync(int id);
    }
}
