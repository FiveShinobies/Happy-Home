using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotificationService.DTOs;
using NotificationService.Services.Interfaces;

namespace NotificationService.Controllers
{
    [ApiController]
    [Route("api/v1/notifications")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _service;

        public NotificationsController(INotificationService service)
        {
            _service = service;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNotificationRequest request)
        {
            Console.WriteLine("------------------------------------------------------");
            Console.WriteLine("------------------------------------------------------");
            Console.WriteLine($"Notification received for {request.To}");
            Console.WriteLine("------------------------------------------------------");
            Console.WriteLine("------------------------------------------------------");
            var response = await _service.CreateAsync(request);
            return Accepted(response);
        }
    }
}
