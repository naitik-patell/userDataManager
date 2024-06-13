using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;
using UserData.Repository.DTO;

namespace UserData.Repository.Interface
{
    public interface IUserRepository
    {
        public Task<bool> UserNameExists(string username);
        public Task<bool> UserEmailExists(string email);
        public Task AddUser(User user);
        public Task<User> GetUserByLoginIdentifier(string loginIdentifier);
        public Task<UserDTO> GetUserByID(int id);
        public Task<List<UserDTO>> GetUsers();
        public int UpdateUser(int id, UserDTO model);
        public int ResetPassword(string password,User user);
        public int DeleteUser(int id);
    }
}
