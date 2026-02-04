using NotificationService.Models;

namespace NotificationService.Providers.Interfaces
{
    public interface INotificationProvider
    {
        Task SendAsync(Notification notification);
    }
}
