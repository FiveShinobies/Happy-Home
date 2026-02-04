using NotificationService.DTOs;
using NotificationService.Enums;
using NotificationService.Models;
using NotificationService.Repositories.Interfaces;
using NotificationService.Services.Interfaces;

namespace NotificationService.Services
{
    public class NotificationServiceImpl : INotificationService
    {
        private readonly INotificationRepository _repository;

        public NotificationServiceImpl(INotificationRepository repository)
        {
            _repository = repository;
        }

        public async Task<NotificationResponse> CreateAsync(CreateNotificationRequest request)
        {
            
            var notification = new Notification
            {
                Type = request.Type,
                To = request.To,
                Subject = request.Subject,
                Message = request.Message,
                Metadata = request.Metadata,
                Status = NotificationStatus.PENDING
            };
            
            await _repository.CreateAsync(notification);

            return new NotificationResponse
            {
                Id = notification.Id,
                Status = notification.Status.ToString()
            };

        }
    }
}
