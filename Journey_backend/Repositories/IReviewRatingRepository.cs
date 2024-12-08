using Journey.Models;

namespace Journey.Repositories
{
    public interface IReviewRatingRepository
    {
        Task<IEnumerable<ReviewRating>> GetAllReview();
        Task<ReviewRating> GetByIdReview(int reviewId);
        Task<IEnumerable<ReviewRating>> GetByListingIdReview(int listingId);
        Task<ReviewRating> AddReview(ReviewRating reviewRating);
        Task<ReviewRating> UpdateReview(ReviewRating reviewRating);
        Task<bool> DeleteReview(int reviewId);
        
    }


}
