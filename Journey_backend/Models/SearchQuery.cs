using System.ComponentModel.DataAnnotations;

namespace Journey.Models
{
    public class SearchQuery
    {
        [Key] public int QueryId { get; set; }
        public string SearchCriteria { get; set; }
        public DateTime Date { get; set; }
        public string Results { get; set; } // e.g., "Found 15"
    }

}
