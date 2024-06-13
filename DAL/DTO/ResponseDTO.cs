using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserData.Repository.DTO
{
    public class ResponseDTO
    {
        public bool isSuccess { get; set; }
        public string message { get; set; }
        public string? token { get; set; }
        public Object data { get; set; }
    }
}
