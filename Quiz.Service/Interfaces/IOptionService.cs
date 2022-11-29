using Quiz.Service.DTOs.OptionDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Service.Interfaces
{
    public interface IOptionService
    {
        Task CreateAsync(OptionCreateDTO OptionCreateDTO);
        List<OptionListDTO> GetAllAysnc(/*int? status*/);
        Task<OptionGetDTO> GetById(int id);
        Task UpdateAsync(int id, OptionUpdateDTO sizeUpdateVM);
        Task<IQueryable<OptionListDTO>> DeleteAsync(int id);
        Task<IQueryable<OptionListDTO>> RestoreAsync(int id);
    }
}
