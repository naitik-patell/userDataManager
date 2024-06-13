using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;
using UserData.Repository.DTO;

namespace UserData.Services.Interface
{
    public interface IUserService
    {
        public Task RegisterUser(UserDTO model); 
        public Task<string> LoginUser(UserLoginDTO model);
        public Task<bool> ForgotPassword(ForgotPasswordDTO model);
        public Task<bool> ResetPassword(ResetPasswordDTO model);
        public Task<UserDTO> GetUserById(int id);
        public Task<List<UserDTO>> GetUsers();
        public int UpdateUser(int id, UserDTO model);
        public int DeleteUser(int id);
        
    }
}
