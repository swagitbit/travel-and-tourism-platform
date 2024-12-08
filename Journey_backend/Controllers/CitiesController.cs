using Journey.Dtos;
using Journey.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Journey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly CityService _cityService;

        public CitiesController(CityService cityService)
        {
            _cityService = cityService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCity(CityLocationDto cityDto)
        {
            if (string.IsNullOrWhiteSpace(cityDto.CityName))
            {
                return BadRequest("City name is required.");
            }

            var city = await _cityService.AddCity(cityDto);
            return Ok(city);
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _cityService.GetCities();
            return Ok(cities);
        }
    }
}
