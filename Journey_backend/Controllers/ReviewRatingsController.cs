using Journey.Dtos;
using Journey.Services;
using Microsoft.AspNetCore.Mvc;

namespace Journey.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewRatingsController : ControllerBase
    {
        private readonly ReviewRatingService _service;

        public ReviewRatingsController(ReviewRatingService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReview()
        {
            return Ok(await _service.GetAllReview());
        }

        [HttpGet("ByListing/{listingId}")]
        public async Task<IActionResult> GetByListingIdReview(int listingId)
        {
            return Ok(await _service.GetByListingIdReview(listingId));
        }

        [HttpPost]
        public async Task<IActionResult> AddReview(CreateReviewRatingDto dto)
        {
            var createdReview = await _service.AddReview(dto);
            return CreatedAtAction(nameof(GetByListingIdReview), new { listingId = createdReview.ListingId }, createdReview);
        }

        [HttpPut("{reviewId}")]
        public async Task<IActionResult> Update(int reviewId, CreateReviewRatingDto dto)
        {
            var updatedReview = await _service.UpdateReview(reviewId, dto);
            if (updatedReview == null) return NotFound();
            return Ok(updatedReview);
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            var success = await _service.DeleteReview(reviewId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
