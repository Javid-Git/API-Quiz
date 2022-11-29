using Quiz.Core.Repositories;
using Quiz.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Data.Repositories
{
    public class QuestionRepository : Repository<Question>, IQuestionRepository
    {
        public QuestionRepository(AppDbContext context) : base(context)
        {

        }
    }
}
