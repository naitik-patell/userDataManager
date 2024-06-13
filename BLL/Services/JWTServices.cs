using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;
using UserData.Services.Interface;

namespace UserData.Services.Repositories
{
    public class JWTServices : IJWTService
    {
        private readonly IConfiguration _configuration;
        public JWTServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> GenerateToken(User user)
        {
            if (user != null)
            {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("userid",user.Id.ToString()),
                new Claim("username",user.Username)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddMinutes(30);
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                                                 _configuration["Jwt:Audience"],
                                                 claims,
                                                 expires: expires,
                                                 signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);

            }
            return null;
        }


        //public bool validateToken(string token, out JwtSecurityToken jwtSecurityToken)
        //{
        //    throw new NotImplementedException();
        //}
        //public IEnumerable<Claim> ExtractClaims(string jwtToken)
        //{
        //    throw new NotImplementedException();
        //}



    }
}
