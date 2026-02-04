namespace NotificationService.Configurations
{
    public class MongoSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string NotificationsCollectionName { get; set; } = null!;
    }
}
