using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserData.Repository.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }

        [Required]
        public String FirstName { get; set; }
        [Required]
        public String LastName { get; set; }

        [Required]
        [EmailAddress]
        public String Email { get; set; }

        public String Phone { get; set; }
        [Required]
        public String UserName { get; set; }

        [RegularExpression(@"^.{6,}$", ErrorMessage = "Password must be at least 6 characters long.")]
        public String? Password { get; set; }
        public int? CountryId { get; set; }
        public int? Gender { get; set; }
        public DateOnly BirthDate { get; set; }
        public String StreetAddress { get; set; }
        public String? Country { get; set; }
        public String? GenderName{ get; set; }

    }
}
