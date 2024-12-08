using Journey.Dtos;
using Journey.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Listings
{
    [Key] public int ListingId { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
    public string Amenities { get; set; }
    public decimal PriceRange { get; set; }

    public string ContactDetails { get; set; }
    public string Image { get; set; }
    public double? Rating { get; set; }

    
}
