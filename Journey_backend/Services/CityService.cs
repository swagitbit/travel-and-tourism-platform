using Journey.Dtos;
using Journey.Models;
using Journey.Repositories;

namespace Journey.Services
{
        public class CityService
        {
            private readonly ICityRepository _cityRepository;

            public CityService(ICityRepository cityRepository)
            {
                _cityRepository = cityRepository;
            }

            public async Task<CityLocation> AddCity(CityLocationDto cityDto)
            {
                var city = new CityLocation
                {
                    CityName = cityDto.CityName,
                    CityDescription = cityDto.CityDescription,
                    Image = cityDto.Image
                };

                return await _cityRepository.AddCityAsync(city);
            }

            public async Task<List<CityLocation>> GetCities()
            {
                return await _cityRepository.GetAllCitiesAsync();
            }
        }
    }

