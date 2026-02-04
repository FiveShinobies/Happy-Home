using NotificationService.Models;

namespace NotificationService.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task CreateAsync(Notification notification);
        
        Task<Notification?> GetByIdAsync(string id);

        Task<List<Notification>> GetPendingAsync(int limit);

        Task UpdateAsync(Notification notification);
    }
}
