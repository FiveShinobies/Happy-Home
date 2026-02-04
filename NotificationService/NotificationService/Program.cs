
using NotificationService.Configurations;
using NotificationService.Providers;
using NotificationService.Providers.Interfaces;
using NotificationService.Repositories;
using NotificationService.Repositories.Interfaces;
using NotificationService.Services;
using NotificationService.Services.Interfaces;

namespace NotificationService
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

            builder.Services.Configure<MongoSettings>(
                builder.Configuration.GetSection("MongoSettings")
                );

            builder.Services.AddSingleton<INotificationRepository , NotificationRepository>();
            
            builder.Services.AddScoped<INotificationService , NotificationServiceImpl>();

            builder.Services.AddHostedService<BackgroundWorkers.NotificationProcessor>();

            builder.Services.Configure<SmtpSettings>(
                builder.Configuration.GetSection("SmtpSettings")
            );

            builder.Services.AddScoped<INotificationProvider, SmtpEmailProvider>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            

            //app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
