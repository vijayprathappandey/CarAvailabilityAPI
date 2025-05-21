namespace CarAvailabilityAPI.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string CarName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
