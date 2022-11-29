using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz.Service.DTOs.OptionDTOs;
using Quiz.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Api.Area.Manage.Controllers
{
    [Route("api/manage/[controller]")]
    [ApiController]
    public class OptionController : ControllerBase
    {
        private readonly IOptionService _optionService;
        private readonly IMapper _mapper;
        public OptionController(IOptionService optionService, IMapper mapper)
        {
            _optionService = optionService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddOption(OptionCreateDTO question)
        {
            await _optionService.CreateAsync(question);
            return Ok(question);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateOption(int id, OptionUpdateDTO question)
        {
            await _optionService.UpdateAsync(id, question);
            return NoContent();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_optionService.GetAllAysnc());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            OptionGetDTO question = await _optionService.GetById(id);
            return Ok(question);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _optionService.DeleteAsync(id);
            return NoContent();
        }
    }
}
