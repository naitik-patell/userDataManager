using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserData.Repository.DTO
{
    public class UserLoginDTO
    {
        [Required]
        public String LoginIdentifier { get; set; }  // This can be either username or email
        
        [Required]
        public String Password { get; set; }
    }
}
