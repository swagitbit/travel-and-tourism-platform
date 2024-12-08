using Journey.Data;
using Journey.Dtos;
using Journey.Models;
using Journey.Repositories;

namespace Journey.Services
{
    public class ReviewRatingService
    {
        private readonly IReviewRatingRepository _repository;
        private readonly AppDbContext _context;

        public ReviewRatingService(IReviewRatingRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<ReviewRating>> GetAllReview()
        {
            var reviews = await _repository.GetAllReview();
            return reviews.Select(r => new ReviewRating
            {
                ReviewId = r.ReviewId,
                ListingId = r.ListingId,
                UserId = r.UserId,
                Rating = r.Rating,
                Comment = r.Comment,
                DatePosted = r.DatePosted
            });
        }

        public async Task<IEnumerable<ReviewRating>> GetByListingIdReview(int listingId)
        {
            var reviews = await _repository.GetByListingIdReview(listingId);
            return reviews.Select(r => new ReviewRating
            {
                ReviewId = r.ReviewId,
                ListingId = r.ListingId,
                UserId = r.UserId,
                Rating = r.Rating,
                Comment = r.Comment,
                DatePosted = r.DatePosted
            });
        }

        public async Task<ReviewRating> AddReview(CreateReviewRatingDto dto)
        {
            var review = new ReviewRating
            {
                ListingId = dto.ListingId,
                UserId = dto.UserId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                DatePosted = DateTime.UtcNow
            };

            // Add the new review
            var createdReview = await _repository.AddReview(review);

            // Update the listing's average rating
            await UpdateListingRating(dto.ListingId);

            return createdReview;
        }

        private async Task UpdateListingRating(int listingId)
        {
            var reviews = await _repository.GetByListingIdReview(listingId);

            var averageRating = reviews.Any() ? reviews.Average(r => (double)r.Rating) : 0.0;

            var roundedRating = Math.Round(averageRating, 0, MidpointRounding.AwayFromZero);
            
            var listing = await _context.Listings.FindAsync(listingId);
            if (listing != null)
            {
                listing.Rating = roundedRating;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ReviewRating> UpdateReview(int reviewId, CreateReviewRatingDto dto)
        {
            var existingReview = await _repository.GetByIdReview(reviewId);
            if (existingReview == null) return null;

            // Update fields
            existingReview.Rating = dto.Rating;
            existingReview.Comment = dto.Comment;
            existingReview.DatePosted = DateTime.UtcNow;

            var updatedReview = await _repository.UpdateReview(existingReview);

            return new ReviewRating
            {
                ReviewId = updatedReview.ReviewId,
                ListingId = updatedReview.ListingId,
                UserId = updatedReview.UserId,
                Rating = updatedReview.Rating,
                Comment = updatedReview.Comment,
                DatePosted = updatedReview.DatePosted
            };
        }


        public async Task<bool> DeleteReview(int reviewId)
        {
            return await _repository.DeleteReview(reviewId);
        }
    }
}
