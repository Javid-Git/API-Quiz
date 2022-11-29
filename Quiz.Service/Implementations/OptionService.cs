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
    public class OptionService : IOptionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OptionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task CreateAsync(OptionCreateDTO optionCreateDTO)
        {
            Option option = _mapper.Map<Option>(optionCreateDTO);
            if (await _unitOfWork.OptionRepository.IsExistAsync(c => c.Qoption.ToLower() == optionCreateDTO.Qoption.Trim().ToLower()))
            {
                throw new AlreadyExists($"Option {optionCreateDTO.Qoption} already Exists");
            }
            if (optionCreateDTO.QuestionId > _unitOfWork.QuestionRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result.Count)
            {
                throw new ItemNotFound($"Question with id = {optionCreateDTO.QuestionId} doesn't exist");

            }
            option.Qoption = optionCreateDTO.Qoption;
            option.QuestionId = optionCreateDTO.QuestionId;

            await _unitOfWork.OptionRepository.AddAsync(option);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IQueryable<OptionListDTO>> DeleteAsync(int id)
        {
            Option option = await _unitOfWork.OptionRepository.GetAsync(c => !c.IsDeleted && c.Id == id);

            if (option == null)
                throw new ItemNotFound($"Item not found");

            option.IsDeleted = true;
            option.DeletedAt = DateTime.UtcNow.AddHours(4);

            await _unitOfWork.CommitAsync();
            List<OptionListDTO> colorListVMs = _mapper.Map<List<OptionListDTO>>(_unitOfWork.OptionRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
            IQueryable<OptionListDTO> query = colorListVMs.AsQueryable();
            return query;
        }

        public List<OptionListDTO> GetAllAysnc()
        {
            List<OptionListDTO> optionListDTO = _mapper.Map<List<OptionListDTO>>(_unitOfWork.OptionRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
            return optionListDTO;
        }

        public async Task<OptionGetDTO> GetById(int id)
        {
            Option option = await _unitOfWork.OptionRepository.GetAsync(c => (!c.IsDeleted || c.IsDeleted) && c.Id == id);

            if (option == null)
            {
                throw new ItemNotFound($"Item not found");

            }
            OptionGetDTO sizeGetVM = _mapper.Map<OptionGetDTO>(option);

            return sizeGetVM;
        }

        public async Task<IQueryable<OptionListDTO>> RestoreAsync(int id)
        {
            Option option = await _unitOfWork.OptionRepository.GetAsync(c => c.IsDeleted && c.Id == id);

            if (option == null)
            {
                throw new ItemNotFound($"Item not found");
            }

            option.IsDeleted = false;
            option.DeletedAt = null;

            await _unitOfWork.CommitAsync();
            List<OptionListDTO> colorListVMs = _mapper.Map<List<OptionListDTO>>(_unitOfWork.OptionRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result);
            IQueryable<OptionListDTO> query = colorListVMs.AsQueryable();

            return query;
        }

        public async Task UpdateAsync(int id, OptionUpdateDTO optionUpdateDTO)
        {
            Option option = await _unitOfWork.OptionRepository.GetAsync(c => !c.IsDeleted && c.Id == id || c.IsDeleted);

            if (option == null)
            {
                throw new ItemNotFound($"Item not found");
            }


            if (await _unitOfWork.OptionRepository.IsExistAsync(c => c.Qoption.ToLower() == optionUpdateDTO.Qoption.Trim().ToLower()))
            {
                if (option.Qoption == optionUpdateDTO.Qoption)
                {
                    option.Qoption = optionUpdateDTO.Qoption;

                    option.UpdatedAt = DateTime.UtcNow.AddHours(4);

                    await _unitOfWork.CommitAsync();
                }
                else
                {
                    throw new AlreadyExists($"Size {optionUpdateDTO.Qoption} already Exists");
                }
               
            }
            if (optionUpdateDTO.QuestionId != 0)
            {
                if (optionUpdateDTO.QuestionId <= (_unitOfWork.QuestionRepository.GetAllAsync(r => r.IsDeleted || !r.IsDeleted).Result).Count)
                {
                    throw new ItemNotFound($"Question with {optionUpdateDTO.QuestionId} id doesn't exist");

                }
                option.QuestionId = optionUpdateDTO.QuestionId;
            }
            option.Qoption = optionUpdateDTO.Qoption;


            option.UpdatedAt = DateTime.UtcNow.AddHours(4);

            await _unitOfWork.CommitAsync();
        }
    }
}
