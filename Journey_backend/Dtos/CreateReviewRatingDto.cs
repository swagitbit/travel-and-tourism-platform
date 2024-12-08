namespace Journey.Dtos
{
    public class CreateReviewRatingDto
    {
        public int ListingId { get; set; }
        public string UserId { get; set; }
        public decimal Rating { get; set; } // 1-5
        public string Comment { get; set; }
    }
}
