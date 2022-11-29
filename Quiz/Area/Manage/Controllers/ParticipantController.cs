using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz.Core.Entities;
using Quiz.Service.DTOs.ParticipantDTOs;
using Quiz.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Api.Area.Manage.Controllers
{
    [Route("api/manage/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly IParticipantService _participantService;
        private readonly IMapper _mapper;
        public ParticipantController(IParticipantService participantService, IMapper mapper)
        {
            _participantService = participantService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddParticipant(ParticipantCreateDTO participant)
        {
            Participant oldParticipant = await _participantService.CreateAsync(participant);
            if (oldParticipant != null)
            {
                return Ok(oldParticipant);
            }
            return Ok(participant);

        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateParticipant(int id, ParticipantUpdateDTO participant)
        {
            await _participantService.UpdateAsync(id, participant);
            return NoContent();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_participantService.GetAllAysnc());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            ParticipantGetDTO participant = await _participantService.GetById(id);
            return Ok(participant);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _participantService.DeleteAsync(id);
            return NoContent();
        }
    }
}

