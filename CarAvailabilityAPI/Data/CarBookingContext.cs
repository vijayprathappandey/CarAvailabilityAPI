using Microsoft.EntityFrameworkCore;
using CarAvailabilityAPI.Models;

namespace CarAvailabilityAPI.Data
{
    public class CarBookingContext : DbContext
    {
        public CarBookingContext(DbContextOptions<CarBookingContext> options) : base(options) { }

        public DbSet<Booking> Bookings { get; set; }
    }
}
