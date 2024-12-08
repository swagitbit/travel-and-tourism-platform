namespace Journey.Models
{
    public class Activity
    {
        public int ActivityId { get; set; }
        public int ListingId { get; set; } // Foreign Key to Listings
        public string ActivityName { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
        //public Listings Listing { get; set; }
    }
}
