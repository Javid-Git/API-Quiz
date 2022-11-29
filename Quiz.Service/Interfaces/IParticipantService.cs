using Quiz.Core.Entities;
using Quiz.Service.DTOs.ParticipantDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Service.Interfaces
{
    public interface IParticipantService
    {
        Task<Participant> CreateAsync(ParticipantCreateDTO ParticipantCreateDTO);
        List<ParticipantListDTO> GetAllAysnc(/*int? status*/);
        Task<ParticipantGetDTO> GetById(int id);
        Task UpdateAsync(int id, ParticipantUpdateDTO sizeUpdateVM);
        Task<IQueryable<ParticipantListDTO>> DeleteAsync(int id);
        //Task<IQueryable<ParticipantListDTO>> RestoreAsync(int id);
    }
}
