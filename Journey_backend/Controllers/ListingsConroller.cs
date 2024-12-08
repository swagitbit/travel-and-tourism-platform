using Journey.Data;
using Journey.Dtos;
using Journey.Models;
using Journey.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Journey.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly ListingService _service;
        private readonly AppDbContext _context;

        public ListingsController(ListingService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllListing()
        {
            return Ok(await _service.GetAllListing());
        }

        [HttpGet("contact")]
        public async Task<ActionResult<IEnumerable<Listings>>> GetListingsByContact([FromQuery] string contactDetails)
        {
            var listings = await _service.GetListingsByContact(contactDetails);
            return Ok(listings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdListing(int id)
        {
            var listing = await _service.GetByIdListing(id);
            if (listing == null) return NotFound();
            return Ok(listing);
        }

        

        [HttpGet("location/{location}")]
        public async Task<IActionResult> GetListingsByLocation(string location)
        {
            var listings = await _service.GetListingsByLocation(location);
            if (!listings.Any())
            {
                return NotFound(new { message = "No listings found for the specified location." });
            }

            return Ok(listings);
        }

        /*[HttpGet("my-listings")]
        [Authorize]
        public async Task<IActionResult> GetMyListings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            try
            {
                var listings = await _service.GetListingsByUserId(userId);
                return Ok(listings);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }*/

        [HttpPost]
        [Authorize(Roles = "ServiceProvider")]
        public async Task<IActionResult> AddListing(CreateListingDto createListingDto)
        {
            try
            {
                var result = await _service.AddListing(createListingDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult> SearchListings(
     string location = null,
     decimal? minPrice = null,
     decimal? maxPrice = null,
     double? minRating = null,
     string category = null,
     int page = 1,
     int pageSize = 10)
        {
            var listings = await _service.SearchListings(location, minPrice, maxPrice, minRating, category);

            if (!listings.Any())
                return NotFound("No listings found matching your criteria.");

            // Pagination
            var totalResults = listings.Count();
            listings = listings.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            // Log Search Query
            var searchCriteria = BuildSearchCriteria(location, minPrice, maxPrice, minRating, category);

            var searchQuery = new SearchQuery
            {
                SearchCriteria = searchCriteria,
                Date = DateTime.UtcNow,
                Results = $"Found {totalResults} results"
            };

            _context.SearchQuery.Add(searchQuery);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                TotalResults = totalResults,
                Page = page,
                PageSize = pageSize,
                Listings = listings
            });
        }

        private string BuildSearchCriteria(string location, decimal? minPrice, decimal? maxPrice, double? minRating, string category)
        {
            var criteria = "";

            if (!string.IsNullOrEmpty(location))
                criteria += $"Location={location}, ";

            if (minPrice.HasValue || maxPrice.HasValue)
                criteria += $"Budget={minPrice}-{maxPrice}, ";

            if (minRating.HasValue)
                criteria += $"Rating={minRating}, ";

            if (!string.IsNullOrEmpty(category))
                criteria += $"Category={category}, ";

            return criteria.TrimEnd(',', ' ');
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "ServiceProvider")]
        public async Task<IActionResult> UpdateListing(int id, CreateListingDto dto)
        {
            var updatedListing = await _service.UpdateListing(id, dto);
            if (updatedListing == null) return NotFound();
            return Ok(updatedListing);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "ServiceProvider")]
        public async Task<IActionResult> DeleteListing(int id)
        {
            var success = await _service.DeleteListing(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
