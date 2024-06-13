using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserData.Repository.DTO
{
    public class ResetPasswordDTO
    {
        [Required]
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
