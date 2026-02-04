using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using NotificationService.Configurations;
using NotificationService.Models;
using NotificationService.Providers.Interfaces;

namespace NotificationService.Providers
{
    public class SmtpEmailProvider : INotificationProvider
    {
        private readonly SmtpSettings _settings;
        
        public SmtpEmailProvider(IOptions<SmtpSettings> options)
        {
            _settings = options.Value;
        }

        public async Task SendAsync(Notification notification)
        {

            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_settings.Username));
            email.To.Add(MailboxAddress.Parse(notification.To));
            email.Subject = notification.Subject ?? "No Subject";
        
            email.Body = new TextPart("plain")
            {
                Text = notification.Message
            };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();

            await smtp.ConnectAsync(
                _settings.Host, 
                _settings.Port, 
                SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(_settings.Username, _settings.Password);

            await smtp.SendAsync(email);

            await smtp.DisconnectAsync(true);
        }
    }
}
