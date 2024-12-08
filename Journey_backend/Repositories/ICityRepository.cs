using Journey.Models;

namespace Journey.Repositories
{
    public interface ICityRepository
    {
        Task<CityLocation> AddCityAsync(CityLocation city);
        Task<List<CityLocation>> GetAllCitiesAsync();
        Task<bool> CityExistsAsync(string cityName);
    }
}
