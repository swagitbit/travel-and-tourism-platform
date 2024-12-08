using Journey.Data;
using Journey.Models;
using Microsoft.EntityFrameworkCore;

namespace Journey.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly AppDbContext _context;

        public CityRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CityLocation> AddCityAsync(CityLocation city)
        {
            _context.CityLocation.Add(city);
            await _context.SaveChangesAsync();
            return city;
        }

        public async Task<List<CityLocation>> GetAllCitiesAsync()
        {
            return await _context.CityLocation.ToListAsync();
        }

        public async Task<bool> CityExistsAsync(string cityName)
        {
            return await _context.CityLocation
                .AnyAsync(c => c.CityName.ToLower() == cityName.ToLower());
        }
    }
}
