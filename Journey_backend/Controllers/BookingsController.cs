using Journey.Dtos;
using Journey.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Journey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingsController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost("book")]
        [Authorize]
        public async Task<IActionResult> BookService(BookingRequestDto bookingRequest)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            try
            {
                var booking = await _bookingService.BookService(
                    bookingRequest.UserId,
                    bookingRequest.NumberOfPeople,
                    bookingRequest.ListingId
                );
                return Ok(booking);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
