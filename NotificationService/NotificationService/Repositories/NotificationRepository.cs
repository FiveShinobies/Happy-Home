using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NotificationService.Configurations;
using NotificationService.Enums;
using NotificationService.Models;
using NotificationService.Repositories.Interfaces;

namespace NotificationService.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IMongoCollection<Notification> _collection;

        public NotificationRepository(IOptions<MongoSettings> mongoOptions)
        {
            var settings = mongoOptions.Value;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _collection = database.GetCollection<Notification>(settings.NotificationsCollectionName);

        }

        public async Task CreateAsync(Notification notification)
        {
            await _collection.InsertOneAsync(notification);
        }

        public async Task<Notification?> GetByIdAsync(string id)
        {
            return await _collection
                   .Find(n => n.Id == id)
                   .FirstOrDefaultAsync();
        }

        public async Task<List<Notification>> GetPendingAsync(int limit)
        {
            return await _collection
                .Find(n => n.Status == NotificationStatus.PENDING)
                .Limit(limit)
                .ToListAsync();
        }

        public async Task UpdateAsync(Notification notification)
        {
            await _collection.ReplaceOneAsync(
                n => n.Id == notification.Id,
                notification);
        }
    }
}
