using System.Reflection;
using Journey.Dtos;
using Journey.Models;
using Journey.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Journey.Services
{
    public class ListingService
    {
        private readonly IListingRepository _repository;
        private readonly ICityRepository _cityLocationRepository;

        public ListingService(IListingRepository repository, ICityRepository cityLocationRepository)
        {
            _repository = repository;
            _cityLocationRepository = cityLocationRepository;
        }

        public async Task<IEnumerable<Listings>> GetAllListing()
        {
            var listings = await _repository.GetAllListing();
            return listings.Select(l => new Listings
            {
                ListingId = l.ListingId,
                Name = l.Name,
                Category = l.Category,
                Location = l.Location,
                Description = l.Description,
                Amenities = l.Amenities,
                PriceRange = l.PriceRange,
                ContactDetails = l.ContactDetails,
                Image = l.Image,
                Rating= l.Rating
            });
        }

        public async Task<Listings> GetByIdListing(int id)
        {
            var listing = await _repository.GetByIdListing(id);
            if (listing == null) return null;
            Console.WriteLine($"Fetching listing with ID: {id}");
            return new Listings
            {
                ListingId = listing.ListingId,
                Name = listing.Name,
                Category = listing.Category,
                Location = listing.Location,
                Description = listing.Description,
                Amenities = listing.Amenities,
                PriceRange = listing.PriceRange,
                ContactDetails = listing.ContactDetails,
                Image = listing.Image,
                Rating=listing.Rating
            };
        }

        public async Task<IEnumerable<Listings>> GetListingsByContact(string contactDetails)
        {
            return await _repository.GetListingsByContact(contactDetails);
        }

        /* public async Task<List<Listings>> GetListingsByUserId(string userId)
         {
             return await _repository.GetListingsByUserId(userId);
         }*/


        public async Task<Listings> AddListing(CreateListingDto dto)
        {
            var cityExists = await _cityLocationRepository.CityExistsAsync(dto.Location);
            if (!cityExists)
            {
                throw new Exception("The specified city is not available.");
            }
            var listing = new Listings
            {
                Name = dto.Name,
                Category = dto.Category,
                Location = dto.Location,
                Description = dto.Description,
                Amenities = dto.Amenities,
                PriceRange = dto.PriceRange,
                ContactDetails = dto.ContactDetails,
                Image = dto.Image,
                Rating = 0.0
            };

            var created = await _repository.AddListing(listing);
            return new Listings
            {
                ListingId = created.ListingId,
                Name = created.Name,
                Category = created.Category,
                Location = created.Location,
                Description = created.Description,
                Amenities = created.Amenities,
                PriceRange = created.PriceRange,
                ContactDetails = created.ContactDetails,
                Image = created.Image,
                Rating= created.Rating
            };
        }
        public async Task<IEnumerable<Listings>> GetListingsByLocation(string location)
        {
            return await _repository.GetListingsByLocation(location);
        }
        public async Task<IEnumerable<Listings>> SearchListings(
     string location = null,
     decimal? minPrice = null,
     decimal? maxPrice = null,
     double? minRating = null,
     string category = null)
        {
            var query = await _repository.SearchListings(location, minPrice, maxPrice, minRating, category);
            return query;
        }


        public async Task<Listings> UpdateListing(int id, CreateListingDto dto)
        {
            var existingListing = await _repository.GetByIdListing(id);
            if (existingListing == null) return null;

            existingListing.Name = dto.Name;
            existingListing.Category = dto.Category;
            existingListing.Location = dto.Location;
            existingListing.Description = dto.Description;
            existingListing.Amenities = dto.Amenities;
            existingListing.PriceRange = dto.PriceRange;
            existingListing.ContactDetails = dto.ContactDetails;
            existingListing.Image = dto.Image;

            var updatedListing = await _repository.UpdateListing(existingListing);

            return new Listings
            {
                ListingId = updatedListing.ListingId,
                Name = updatedListing.Name,
                Category = updatedListing.Category,
                Location = updatedListing.Location,
                Description = updatedListing.Description,
                Amenities = updatedListing.Amenities,
                PriceRange = updatedListing.PriceRange,
                ContactDetails = updatedListing.ContactDetails,
                Image = updatedListing.Image
            };
        }

        public async Task<bool> DeleteListing(int id)
        {
            return await _repository.DeleteListing(id);
        }
    }
}
