using Quiz.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Quiz.Core
{
    public interface IUnitOfWork
    {
        IQuestionRepository QuestionRepository { get; }
        IOptionRepository OptionRepository { get; }
        IParticipantRepository ParticipantRepository { get; }
        Task<int> CommitAsync();
        int Commit();
    }
}
