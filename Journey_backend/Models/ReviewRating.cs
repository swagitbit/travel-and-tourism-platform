using System.ComponentModel.DataAnnotations;

namespace Journey.Models
{
    public class ReviewRating
    {
        [Key] public int ReviewId {  get; set; }
        public int ListingId {  get; set; }
        public string UserId { get; set; }
        public decimal Rating { get; set; }
        public string Comment {  get; set; }
        public DateTime DatePosted { get; set; }
    }
}
