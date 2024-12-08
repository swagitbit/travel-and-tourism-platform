using System.ComponentModel.DataAnnotations;

namespace Journey.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Roles { get; set; }
        [Required]
        public string PhoneNumber {  get; set; } 

    }
}
