using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz.Entities;
using Quiz.Service.DTOs.QuestionDTOs;
using Quiz.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly IMapper _mapper;
        public QuestionController(IQuestionService questionService, IMapper mapper)
        {
            _questionService = questionService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddQuestion(QuestionCreateDTO question)
        {
            await _questionService.CreateAsync(question);
            return Ok(question);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, QuestionUpdateDTO question)
        {
            await _questionService.UpdateAsync(id, question);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<QuestionListDTO> questions = await _questionService.GetAllAysnc();
            

            return Ok(questions);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            QuestionGetDTO question = await _questionService.GetById(id);
            return Ok(question);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _questionService.DeleteAsync(id);
            return NoContent();
        }

        //[Htt]
        //[Route("{id}")]
        //public async Task<IActionResult> Restore(int id)
        //{
        //    await _questionService.RestoreAsync(id);
        //    return NoContent();
        //}
    }
}
