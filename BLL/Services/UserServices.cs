using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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
using UserData.Services.Interface;

namespace UserData.Services.Repositories
{
    public class UserServices : IUserService
    {
        private readonly IJWTService _jwtservice;
        private readonly IUserRepository _userRepository;
        private readonly IEmailService _emailservice;
        public UserServices(IJWTService jwtservice, IUserRepository userRepository, IEmailService emailservice)
        {
            _jwtservice = jwtservice;
            _userRepository = userRepository;
            _emailservice = emailservice;
        }

        public async Task RegisterUser(UserDTO model)
        {
            bool usernameExists = await _userRepository.UserNameExists(model.UserName.ToLower());
            bool emailExists = await _userRepository.UserEmailExists(model.Email.ToLower());

            if (usernameExists)
            {
                throw new Exception("The username is already taken.");
            }

            if (emailExists)
            {
                throw new Exception("The email is already in use.");
            }

            //Guid guid = Guid.NewGuid();
            //string str = guid.ToString();
            var user = new User
            {

                Firstname = model.FirstName,
                Lastname = model.LastName,
                Email = model.Email.ToLower(),
                Phone = model.Phone,
                Username = model.UserName.ToLower(),
                Password = Crypto.HashPassword(model.Password),
                Countryid = model.CountryId,
                Gender = model.Gender,
                Birthdate = model.BirthDate,
                Streetaddress = model.StreetAddress,
                Createddate = DateTime.Now,
            };

            await _userRepository.AddUser(user);
            _emailservice.SendEmail(model.Email, "Registered as User for UserDataManagement Services", user.Firstname);
        }


        public async Task<string> LoginUser(UserLoginDTO model)
        {
            try
            {

                var user = await _userRepository.GetUserByLoginIdentifier(model.LoginIdentifier);
                if (user != null && Crypto.VerifyHashedPassword(user.Password, model.Password))
                {
                    return await _jwtservice.GenerateToken(user);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<bool> ForgotPassword(ForgotPasswordDTO model)
        {
            try
            {
                var user = await _userRepository.GetUserByLoginIdentifier(model.ForgetPasswordIdentifier);
                if (user != null)
                {
                    var token = await _jwtservice.GenerateToken(user);
                    _emailservice.SendForgotPasswdMail(user.Email, "Link to reset your password", token);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving users. Please try again later.");
            }
        }

        public async Task<bool> ResetPassword(ResetPasswordDTO model)
        {
            try
            {
                var user = await _userRepository.GetUserByLoginIdentifier(model.Email);
                if (user != null)
                {
                    _userRepository.ResetPassword(model.Password,user);

                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while resetting user password. Please try again later.");
            }
        }


        public Task<UserDTO> GetUserById(int id)
        {
            try
            {
                return _userRepository.GetUserByID(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving users. Please try again later.");
            }
        }
        public Task<List<UserDTO>> GetUsers()
        {

            try
            {
                return _userRepository.GetUsers();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving users. Please try again later.");
            }


        }
        public int UpdateUser(int id, UserDTO model)
        {
            try
            {
                return _userRepository.UpdateUser(id, model);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the user. Please try again later.");
            }

        }
        public int DeleteUser(int id)
        {
            try
            {
                return _userRepository.DeleteUser(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the user. Please try again later.");
            }

        }
        
        


    }


}
