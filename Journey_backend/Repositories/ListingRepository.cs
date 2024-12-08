using Journey.Data;
using Journey.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace Journey.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly AppDbContext _context;

        public ListingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Listings>> GetAllListing()
        {
            return await _context.Listings.ToListAsync();
        }

        public async Task<IEnumerable<Listings>> GetListingsByLocation(string location)
        {
            return await _context.Listings
                .Where(l => l.Location.Contains(location))
                .ToListAsync();
        }

        public async Task<Listings> GetByIdListing(int id)
        {
            return await _context.Listings.FindAsync(id);
        }

        public async Task<IEnumerable<Listings>> GetListingsByContact(string contactDetails)
        {
            return await _context.Listings
                .Where(l => l.ContactDetails == contactDetails)
                .ToListAsync();
        }

        /*public async Task<List<Listings>> GetListingsByUserId(string userId)
        {
            return await _context.Listings
                .Where(listing => listing.UserId == userId)
                .ToListAsync();
        }*/
        public async Task<bool> ListingExists(int listingId)
        {
            return await _context.Listings.AnyAsync(l => l.ListingId == listingId);
        }
        public async Task<Listings> AddListing(Listings listing)
        {
            _context.Listings.Add(listing);
            await _context.SaveChangesAsync();
            return listing;
        }

        public async Task<IEnumerable<Listings>> SearchListings(
     string location = null,
     decimal? minPrice = null,
     decimal? maxPrice = null,
     double? minRating = null,
     string category = null)
        {
            var query = _context.Listings.AsQueryable();

            if (!string.IsNullOrEmpty(location))
                query = query.Where(l => l.Location.Contains(location));

            if (minPrice.HasValue)
                query = query.Where(l => l.PriceRange >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(l => l.PriceRange <= maxPrice.Value);

            if (minRating.HasValue)
                query = query.Where(l => l.Rating >= minRating.Value);

            if (!string.IsNullOrEmpty(category))
                query = query.Where(l => l.Category.ToLower().Equals(category.ToLower()));

            return await query.ToListAsync();
        }

        public async Task<Listings> UpdateListing(Listings listing)
        {
            _context.Listings.Update(listing);
            await _context.SaveChangesAsync();
            return listing;
        }

        public async Task<bool> DeleteListing(int id)
        {
            var listing = await _context.Listings.FindAsync(id);
            if (listing == null) return false;

            _context.Listings.Remove(listing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
