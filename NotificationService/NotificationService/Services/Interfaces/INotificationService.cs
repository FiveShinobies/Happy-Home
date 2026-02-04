using NotificationService.DTOs;

namespace NotificationService.Services.Interfaces
{
    public interface INotificationService
    {
        Task<NotificationResponse> CreateAsync(CreateNotificationRequest request);
    }
}
