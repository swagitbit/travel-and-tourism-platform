using System.ComponentModel.DataAnnotations;

namespace Journey.Dtos
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage ="RoleName required.")]
        public string RoleName { get; set; } = null!;

    }
}
