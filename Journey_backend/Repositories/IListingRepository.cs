using Journey.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace Journey.Repositories
{
    public interface IListingRepository
    {
        Task<IEnumerable<Listings>> GetAllListing();
        Task<Listings> GetByIdListing(int id);
        Task<IEnumerable<Listings>> GetListingsByContact(string contactDetails);
        Task<Listings> AddListing(Listings listing);
        Task<Listings> UpdateListing(Listings listing);
        Task<bool> DeleteListing(int id);
        Task<bool> ListingExists(int listingId);
        //Task<Listings> GetListingByUserId(int userId);
        Task<IEnumerable<Listings>> SearchListings(
            string location = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            double? minRating = null,
            string category = null);
        Task<IEnumerable<Listings>> GetListingsByLocation(string location);

    }
}
