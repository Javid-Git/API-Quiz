using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Quiz.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz.Data.Configuration
{
    public class OptionsConfiguration : IEntityTypeConfiguration<Option>
    {
        public void Configure(EntityTypeBuilder<Option> builder)
        {
            builder.Property(b => b.Qoption).IsRequired(true);
            builder.Property(b => b.QuestionId).IsRequired(true);
        }
    }
}
