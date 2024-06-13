using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;

namespace UserData.Services.Interface
{
    public interface IJWTService
    {
        public Task<string> GenerateToken(User user);
        //public bool validateToken(string token, out JwtSecurityToken jwtSecurityToken);
        //public IEnumerable<Claim> ExtractClaims(string jwtToken);
    }
}
