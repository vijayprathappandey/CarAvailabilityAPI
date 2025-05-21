using CarAvailabilityAPI.Data;
using CarAvailabilityAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarAvailabilityAPI.Controllers
{
    [ApiController]
    [Route("api/cars")]
    public class CarAvailabilityController : ControllerBase
    {
        private readonly CarBookingContext _context;

        public CarAvailabilityController(CarBookingContext context)
        {
            _context = context;
        }

        [HttpPost("availability")]
        public async Task<IActionResult> GetAvailability([FromBody] DateRangeDto range)
        {
            var allCars = new[] { "Swift", "Wagon R", "Kiger", "Creta", "XUV" };

            // Find all bookings that overlap with the selected range
            var bookedCars = await _context.Bookings
                .Where(b => !(b.EndDate < range.StartDate || b.StartDate > range.EndDate))
                .Select(b => b.CarName)
                .ToListAsync();

            var availability = new Dictionary<string, string>();

            foreach (var car in allCars)
            {
                availability[car] = bookedCars.Contains(car) ? "Booked" : "Available";
            }

            return Ok(availability);
        }
    }

    public class DateRangeDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
