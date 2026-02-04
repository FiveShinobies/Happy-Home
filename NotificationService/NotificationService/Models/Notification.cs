using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using NotificationService.Enums;

namespace NotificationService.Models
{
    
    public class Notification
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        [BsonElement("type")]
        public NotificationType Type { get; set; } = NotificationType.EMAIL;

        [BsonElement("to")]
        public string To { get; set; } = null!;

        [BsonElement("subject")] 
        public string? Subject { get; set; }

        [BsonElement("message")]
        public string Message { get; set; } = null!;

        [BsonElement("status")]
        public NotificationStatus Status { get; set; } = NotificationStatus.PENDING;

        [BsonElement("retryCount")]
        public int RetryCount { get; set; } = 0;

        [BsonElement("maxRetries")]
        public int MaxRetries { get; set; } = 3;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("lastAttemptAt")]
        public DateTime? LastAttemptAt { get; set; }

        [BsonElement("metadata")]
        public Dictionary<string, string>? Metadata { get; set; }   

    }
}
