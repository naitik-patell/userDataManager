using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Helpers;
using UserData.Repository.DataContext;
using UserData.Repository.DataModels;
using UserData.Repository.DTO;
using UserData.Repository.Interface;

namespace UserData.Repository.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> UserNameExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
            
        }

        public async Task<bool> UserEmailExists(string email)
        {
            bool UserEmailExists = await _context.Users.AnyAsync(u => u.Email == email);
            return UserEmailExists;
        }

        public async Task AddUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Handle unique constraint violation exception
                if (ex.InnerException?.Message.Contains("IX_Users_Email") == true)
                {
                    throw new Exception("The email is already in use.");
                }
                if (ex.InnerException?.Message.Contains("IX_Users_Username") == true)
                {
                    throw new Exception("The username is already taken.");
                }
                throw;
            }
        }

        public async Task<User> GetUserByLoginIdentifier(string loginIdentifier)
        {
            return  await _context.Users.FirstOrDefaultAsync(u => (u.Username == loginIdentifier || u.Email == loginIdentifier) && !u.Isdeleted);
        }
        public async Task<UserDTO> GetUserByID(int id)
        {
            var user = (from gend in _context.Genders
                        join usr in _context.Users
                        on gend.Id equals usr.Gender 
                        join country in _context.Countries
                        on usr.Countryid equals country.Id
                        where usr.Isdeleted == false  && usr.Id == id
                        select new UserDTO
                        {
                            Id = usr.Id,
                            FirstName = usr.Firstname,
                            LastName = usr.Lastname,
                            Email = usr.Email,
                            Phone = usr.Phone,
                            UserName = usr.Username,
                            CountryId = country.Id,
                            Country = country.Name,
                            Gender= gend.Id,
                            GenderName = gend.Gender1,
                            BirthDate = usr.Birthdate,
                            StreetAddress = usr.Streetaddress
                        }).FirstOrDefault();

            return user;
        }
        public async Task<List<UserDTO>> GetUsers()
        {
            var list =  (from gend in _context.Genders
                        join usr in _context.Users
                        on gend.Id equals usr.Gender
                        join country in _context.Countries
                        on usr.Countryid equals country.Id
                        where usr.Isdeleted == false
                        orderby usr.Id
                        select new UserDTO
                        {
                            Id = usr.Id,
                            FirstName = usr.Firstname,
                            LastName = usr.Lastname,
                            Email = usr.Email,
                            Phone = usr.Phone,
                            UserName = usr.Username,
                            Country = country.Name,
                            GenderName = gend.Gender1,
                            BirthDate = usr.Birthdate,
                            StreetAddress = usr.Streetaddress
                        }).ToList();

            return list;

        }

        public int UpdateUser(int id, UserDTO model)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return 0;
            }

            user.Firstname = model.FirstName;
            user.Lastname = model.LastName;
            user.Email = model.Email;
            user.Phone = model.Phone;
            user.Username = model.UserName;
            user.Countryid = model.CountryId;
            user.Gender = model.Gender;
            user.Birthdate = model.BirthDate;
            user.Streetaddress = model.StreetAddress;
            user.Modifieddate = DateTime.Now;
            if (!string.IsNullOrEmpty(model.Password))
            {
                user.Password = Crypto.HashPassword(model.Password);

            }
            _context.Entry(user).State = EntityState.Modified;
            return _context.SaveChanges();
        }


        public int ResetPassword(string password, User user)
        {
            if (password != null)
            {
                user.Password = Crypto.HashPassword(password);
                user.Modifieddate = DateTime.Now;
                _context.Entry(user).State = EntityState.Modified;
                return _context.SaveChanges();
            }
            return 0;
        }


        public int DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return 0;
            }

            user.Isdeleted = true;
            user.Deleteddate = DateTime.Now;
            _context.Entry(user).State = EntityState.Modified;
            return _context.SaveChanges();
        }
    }
}
