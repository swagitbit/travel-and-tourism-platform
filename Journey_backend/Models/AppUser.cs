using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.AspNetCore.Identity;

namespace Journey.Models
{
    public class AppUser: IdentityUser
    {
        public string Name { get; set; }

    }
}
