using Microsoft.AspNetCore.Mvc;
using DutyMatrix.LoggerService.Data;
using DutyMatrix.LoggerService.Models;

namespace DutyMatrix.LoggerService.Controllers
{
    [ApiController]
    [Route("api/logger")]
    public class LoggerController : ControllerBase
    {
        private readonly LoggerDbContext _context;

        public LoggerController(LoggerDbContext context)
        {
            _context = context;
        }

        [HttpPost("log")]
        public IActionResult Log([FromBody] HistoryLogDto dto)
        {
            var history = new History
            {
                HactionType = Enum.Parse<ActionType>(dto.HactionType),
                HactionDescription = dto.HactionDescription,
                HtimeStamp = DateTime.Now,
                UserId = dto.UserId   // ✅ FK ONLY
            };

            _context.Histories.Add(history);
            _context.SaveChanges();

            return Ok("Log saved successfully");
        }
    }
}
