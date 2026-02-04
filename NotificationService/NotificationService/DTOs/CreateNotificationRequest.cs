using NotificationService.Enums;

namespace NotificationService.DTOs
{
    public class CreateNotificationRequest
    {
        public NotificationType Type { get; set; }
        public string To { get; set; } = null!;
        public string? Subject { get; set; }
        public string Message { get; set; } = null!;
        public Dictionary<string, string>? Metadata { get; set; }
    }
}
