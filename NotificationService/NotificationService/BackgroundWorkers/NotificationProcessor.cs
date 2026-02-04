using NotificationService.Repositories.Interfaces;
using NotificationService.Enums;
using Polly;
using NotificationService.Providers.Interfaces;
using Microsoft.Extensions.DependencyInjection;


namespace NotificationService.BackgroundWorkers
{
    
    public class NotificationProcessor : BackgroundService
    {
        private readonly ILogger<NotificationProcessor> _logger;
        private readonly INotificationRepository _repository;
        private readonly IServiceScopeFactory _scopeFactory;

        public NotificationProcessor(
            ILogger<NotificationProcessor> logger,
            INotificationRepository repository,
            IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _repository = repository;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    _logger.LogInformation("Notification Processor started at: {time}", DateTimeOffset.Now);

    while (!stoppingToken.IsCancellationRequested)
    {
        var pendingNotifications = await _repository.GetPendingAsync(5);

        foreach (var notification in pendingNotifications)
        {
            try
            {
                notification.Status = NotificationStatus.PROCESSING;
                notification.LastAttemptAt = DateTime.UtcNow;

                await _repository.UpdateAsync(notification);

                var retryPolicy = Policy
                    .Handle<Exception>()
                    .WaitAndRetryAsync(
                        notification.MaxRetries,
                        retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                        async (exception, timeSpan, retryCount, context) =>
                        {
                            notification.RetryCount = retryCount;
                            notification.LastAttemptAt = DateTime.UtcNow;

                            await _repository.UpdateAsync(notification);

                            _logger.LogWarning(
                                exception,
                                "Retry {Retry}/{MaxRetries} for notification {Id} after {Delay}s",
                                retryCount,
                                notification.MaxRetries,
                                notification.Id,
                                timeSpan.TotalSeconds);
                        });

                        using (var scope = _scopeFactory.CreateScope())
                        {
                            var provider = scope.ServiceProvider
                                .GetRequiredService<INotificationProvider>();

                            await retryPolicy.ExecuteAsync(() =>
                                provider.SendAsync(notification));
                        }


                        notification.Status = NotificationStatus.SENT;
                await _repository.UpdateAsync(notification);

                _logger.LogInformation(
                    "Notification {Id} successfully sent to {To}",
                    notification.Id,
                    notification.To);
            }
            catch (Exception ex)
            {
                notification.Status = NotificationStatus.FAILED;
                notification.LastAttemptAt = DateTime.UtcNow;

                await _repository.UpdateAsync(notification);

                _logger.LogError(
                    ex,
                    "Notification {Id} failed after {Retries} retries",
                    notification.Id,
                    notification.RetryCount);
            }
        }

        // ⏱ Prevent CPU & DB hammering
        await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
    }
}

    }
}
