using AutoMapper;
using Quiz.Core;
using Quiz.Core.Entities;
using Quiz.Service.DTOs.ParticipantDTOs;
using Quiz.Service.Exceptions;
using Quiz.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Service.Implementations
{
    public class ParticipantService : IParticipantService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ParticipantService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Participant> CreateAsync(ParticipantCreateDTO participantCreateDTO)
        {
            Participant participant = _mapper.Map<Participant>(participantCreateDTO);
            if (await _unitOfWork.ParticipantRepository.IsExistAsync(c => c.Email.ToLower() == participantCreateDTO.Email.Trim().ToLower()))
            {
                Participant participantGet = await _unitOfWork.ParticipantRepository.FindByEmail(p => p.Email.ToLower() == participantCreateDTO.Email.ToLower());
                //if (participantGet != null)
                //{
                //    _unitOfWork.ParticipantRepository.Remove(participantGet);
                //    participant.Name = participantCreateDTO.Name;
                //    participant.Email = participantCreateDTO.Email;

                //    await _unitOfWork.ParticipantRepo sitory.AddAsync(participant);
                //    await _unitOfWork.CommitAsync();
                //}
                return participantGet;
            }

            participant.Email = participantCreateDTO.Email;
            participant.Name = participantCreateDTO.Name;

            await _unitOfWork.ParticipantRepository.AddAsync(participant);
            await _unitOfWork.CommitAsync();
            return participant;
        }

        public async Task<IQueryable<ParticipantListDTO>> DeleteAsync(int id)
        {
            Participant participant = await _unitOfWork.ParticipantRepository.GetAsync(c => !c.IsDeleted && c.Id == id);

            if (participant == null)
                throw new ItemNotFound($"Item not found");

            participant.IsDeleted = true;
            participant.DeletedAt = DateTime.UtcNow.AddHours(4);

            await _unitOfWork.CommitAsync();
            List<ParticipantListDTO> colorListVMs = _mapper.Map<List<ParticipantListDTO>>(_unitOfWork.ParticipantRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
            IQueryable<ParticipantListDTO> query = colorListVMs.AsQueryable();
            return query;
        }

        public List<ParticipantListDTO> GetAllAysnc()
        {
            List<ParticipantListDTO> participantListDTO = _mapper.Map<List<ParticipantListDTO>>(_unitOfWork.ParticipantRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
            return participantListDTO;
        }

        public async Task<ParticipantGetDTO> GetById(int id)
        {
            Participant participant = await _unitOfWork.ParticipantRepository.GetAsync(c => (!c.IsDeleted || c.IsDeleted) && c.Id == id);

            if (participant == null)
            {
                throw new ItemNotFound($"Participant was not found");

            }
            ParticipantGetDTO sizeGetVM = _mapper.Map<ParticipantGetDTO>(participant);

            return sizeGetVM;
        }

        //public async Task<IQueryable<ParticipantListDTO>> RestoreAsync(int id)
        //{
        //    Participant participant = await _unitOfWork.ParticipantRepository.GetAsync(c => c.IsDeleted && c.Id == id);

        //    if (participant == null)
        //    {
        //        throw new ItemNotFound($"Item not found");
        //    }

        //    participant.IsDeleted = false;
        //    participant.DeletedAt = null;

        //    await _unitOfWork.CommitAsync();
        //    List<ParticipantListDTO> colorListVMs = _mapper.Map<List<ParticipantListDTO>>(_unitOfWork.ParticipantRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
        //    IQueryable<ParticipantListDTO> query = colorListVMs.AsQueryable();

        //    return query;
        //}

        public async Task UpdateAsync(int id, ParticipantUpdateDTO participantUpdateDTO)
        {
            Participant participant = await _unitOfWork.ParticipantRepository.GetAsync(c => !c.IsDeleted && c.Id == id || c.IsDeleted);

            if (participant == null)
            {
                throw new ItemNotFound($"Item not found");
            }


            if (await _unitOfWork.ParticipantRepository.IsExistAsync(c => c.Email.ToLower() == participantUpdateDTO.Email.Trim().ToLower()))
            {
                if (participant.Email == participantUpdateDTO.Email)
                {
                    participant.Email = participantUpdateDTO.Email;

                    participant.UpdatedAt = DateTime.UtcNow.AddHours(4);

                    await _unitOfWork.CommitAsync();
                }
                else
                {
                    throw new AlreadyExists($"Participant with {participantUpdateDTO.Email} email already Exists");
                }

            }

            participant.Email = participantUpdateDTO.Email;
            participant.Name = participantUpdateDTO.Name;


            participant.UpdatedAt = DateTime.UtcNow.AddHours(4);

            await _unitOfWork.CommitAsync();
        }
    }
}
