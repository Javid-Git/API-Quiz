using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Quiz.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Data.Configuration
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.Property(b => b.Qtext).IsRequired(true);
        }
    }
}
