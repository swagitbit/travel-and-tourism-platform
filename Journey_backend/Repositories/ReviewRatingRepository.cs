using Journey.Data;
using Journey.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Journey.Repositories
{
    public class ReviewRatingRepository : IReviewRatingRepository
    {
        private readonly AppDbContext _context;

        public ReviewRatingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReviewRating>> GetAllReview()
        {
            return await _context.ReviewRating.ToListAsync();
        }

        public async Task<ReviewRating> GetByIdReview(int reviewId)
        {
            return await _context.ReviewRating.FindAsync(reviewId);
        }

        public async Task<IEnumerable<ReviewRating>> GetByListingIdReview(int listingId)
        {
            return await _context.ReviewRating.Where(r => r.ListingId == listingId).ToListAsync();
        }

        public async Task<ReviewRating> AddReview(ReviewRating reviewRating)
        {
            _context.ReviewRating.Add(reviewRating);
            await _context.SaveChangesAsync();
            return reviewRating;
        }

        public async Task<ReviewRating> UpdateReview(ReviewRating reviewRating)
        {
            _context.ReviewRating.Update(reviewRating);
            await _context.SaveChangesAsync();
            return reviewRating;
        }

        public async Task<bool> DeleteReview(int reviewId)
        {
            var review = await _context.ReviewRating.FindAsync(reviewId);
            if (review == null) return false;

            _context.ReviewRating.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
