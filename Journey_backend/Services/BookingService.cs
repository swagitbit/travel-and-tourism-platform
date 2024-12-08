using Journey.Data;
using Journey.Models;

namespace Journey.Services
{
    public class BookingService
    {
        private readonly AppDbContext _context;

        public BookingService(AppDbContext context)
        {
            _context = context;
            
        }

        public async Task<Booking> BookService(string userId, int listingId, int numberOfPeople)
        {
            if (numberOfPeople <= 0)
                throw new ArgumentException("Number of people must be greater than zero.");

            /*var user= await _context.AppUsers.FindAsync(Id);
            if (listing == null)
                throw new Exception("Listing not found.");*/

            var listing = await _context.Listings.FindAsync(listingId);
            if (listing == null)
                throw new Exception("Listing not found.");

            decimal totalPrice = listing.PriceRange * numberOfPeople;
           
            var booking = new Booking
            {
                UserId = userId,
                ListingId = listingId,
                DateBooked = DateTime.UtcNow,
                NumberOfPeople = numberOfPeople,
                TotalPrice = totalPrice,
                Status = "Confirmed"
            };

            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();

            return booking;
        }

    }
}
