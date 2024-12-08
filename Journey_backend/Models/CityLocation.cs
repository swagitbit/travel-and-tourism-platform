using System.ComponentModel.DataAnnotations;

namespace Journey.Models
{
    public class CityLocation
    {
        [Key] public int Id { get; set; }
        public string CityName {  get; set; }
        public string CityDescription { get; set; }
        public string Image {  get; set; }
    }
}
