using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Quiz.Service.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Api.Extensions
{
    public static class ExceptionHandler
    {
        public static void ExceptionsHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(error =>
            {
                error.Run(async context =>
                {
                    var feature = context.Features.Get<IExceptionHandlerPathFeature>();

                    int statusCode = 500;
                    string errorMessage = "Internal Server Error";

                    if (feature.Error is ItemNotFound)
                    {
                        statusCode = 404;
                        errorMessage = feature.Error.Message;
                    }
                    else if (feature.Error is AlreadyExists)
                    {
                        statusCode = 409;
                        errorMessage = feature.Error.Message;
                    }

                    context.Response.StatusCode = statusCode;
                    await context.Response.WriteAsync(errorMessage);
                });
            });
        }
    }
}
