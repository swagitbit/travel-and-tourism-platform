using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace Journey.Models
{
    public class Booking
    {
        [Key] public int BookingId { get; set; }
      
        public string UserId { get; set; }
        
        public int? ListingId { get; set; }  
        public DateTime DateBooked { get; set; } 
        public int NumberOfPeople { get; set; } 
        public decimal TotalPrice { get; set; }  
        public string Status { get; set; } 
    }

}
