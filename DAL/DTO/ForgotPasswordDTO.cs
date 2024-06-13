using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserData.Repository.DTO
{
    public class ForgotPasswordDTO
    {
        [Required]
        public string ForgetPasswordIdentifier { get; set; }
    }
}
