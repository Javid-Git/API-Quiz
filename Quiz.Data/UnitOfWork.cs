using Quiz.Core;
using Quiz.Core.Repositories;
using Quiz.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly QuestionRepository _questionRepository;
        private readonly OptionRepository _optionRepository;
        private readonly ParticipantRepository _participantRepository;
        
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }
        public IQuestionRepository QuestionRepository => _questionRepository != null ? _questionRepository : new QuestionRepository(_context);
        public IOptionRepository OptionRepository => _optionRepository != null ? _optionRepository : new OptionRepository(_context);
        public IParticipantRepository ParticipantRepository => _participantRepository != null ? _participantRepository : new ParticipantRepository(_context);

        public int Commit()
        {
            return _context.SaveChanges();
        }

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
