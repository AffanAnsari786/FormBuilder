
using Database;
using Microsoft.EntityFrameworkCore;

namespace Forms_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContextPool<InboxContext>(option =>
                option.UseSqlServer("server=172.16.1.90;uid=TTA2024;pwd=Rizvi@2024;database=RizviTTA;Min Pool Size=5;Max Pool Size=500;TrustServerCertificate=True;MultipleActiveResultSets=True;Command timeout=500", sqloptions =>
                {
                    sqloptions.CommandTimeout(30);
                })
            );
            builder.Services.AddCors(options=>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyMethod();
                        builder.AllowAnyHeader();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowAllOrigins");

            app.MapControllers();

            app.Run();
        }
    }
}
