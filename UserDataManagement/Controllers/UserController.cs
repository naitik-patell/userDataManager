using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using UserData.Repository.DataContext;
using UserData.Repository.DataModels;
using UserData.Repository.DTO;
using UserData.Services.Interface;

namespace UserDataManagement.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserDTO model)
        {
            var response = new ResponseDTO();
            if (!ModelState.IsValid)
            {
                response.isSuccess = false;
                response.message = "please fill out all the required fields";

                return BadRequest(response);
            }

            try
            {
                 await _userService.RegisterUser(model);

                response.isSuccess = true;
                response.message = "User registered successfully!";
                return Ok(new { message = "User registered successfully!" });
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("username is already taken"))
                {
                    response.isSuccess = false;
                    response.message = "The username is already taken.";
                    return Conflict(response);
                }

                if (ex.Message.Contains("email is already in use"))
                {
                    response.isSuccess = false;
                    response.message = "The email is already in use.";
                    return Conflict(response);
                }

                response.isSuccess = false;
                response.message = "An unexpected error occurred. Please try again later.";
                return BadRequest(response);
            }
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDTO model)
        {
            var response = new ResponseDTO();
            try
            {
                var token = await _userService.LoginUser(model);
                if (token != null)
                {
                    response.token = token;
                    response.isSuccess = true;
                    response.message = "Login successful!";
                    return Ok(response);
                }

                response.isSuccess = false;
                response.message = "Invalid username or password!";
                return Unauthorized(response);
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
                return BadRequest(response);
            }
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO model)
        {
            var response = new ResponseDTO();
            if (ModelState.IsValid)
            {
                try
                {
                    var res = await _userService.ForgotPassword(model);
                    if (res)
                    {
                        response.isSuccess = true;
                        response.message = "Email link sent successfully";
                        return Ok(response);
                    }
                    response.isSuccess = false;
                    response.message = "No user exists for the entered fields";
                    return NotFound(response);
                }
                catch(Exception ex)
                {
                    response.isSuccess = false;
                    response.message = ex.Message;
                    return BadRequest(response);
                }
               
            }
            response.isSuccess = false;
            response.message = "Some error occured sending form details";
            return BadRequest(response) ;
        }

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO model)
        {
            var response = new ResponseDTO();
            if (ModelState.IsValid)
            {
                try
                {
                    var res = await _userService.ResetPassword(model);
                    if (res)
                    {
                        response.isSuccess = true;
                        response.message = "Password reset Successfully";
                        return Ok(response);
                    }
                    response.isSuccess = false;
                    response.message = "No user exists for the entered fields";
                    return NotFound(response);
                }
                catch (Exception ex)
                {
                    response.isSuccess = false;
                    response.message = ex.Message;
                    return BadRequest(response);
                }

            }
            response.isSuccess = false;
            response.message = "Some error occured sending form details";
            return BadRequest(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var response = new ResponseDTO();
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                response.isSuccess = false;
                response.message = "User doesn't exist";
                return NotFound(response); // Return a 404 if the user is not found
            }
            response.isSuccess = true;
            response.message = "Successfully Fetched user data";
            response.data = user;
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var response = new ResponseDTO();
            try
            {
                var data = _userService.GetUsers();
                if (data != null)
                {
                    response.isSuccess = true;
                    response.message = "Successfully fetched users data";
                    response.data = await _userService.GetUsers();
                    return Ok(response);
                }
                response.isSuccess = false;
                response.message = "there was error fetching data";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = "there was error fetching data";
                return BadRequest(response);
            }


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserDTO model)
        {
            var response = new ResponseDTO();
            try
            {
                var result = _userService.UpdateUser(id, model);
                if (result == 0)
                {
                    response.isSuccess = false;
                    response.message = "User not found";
                    return NotFound(response);
                }
                response.isSuccess = true;
                response.message = "User data updated successfully!";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
                return BadRequest(response);
            }
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var response = new ResponseDTO();
            try
            {
                var result = _userService.DeleteUser(id);
                if (result == 0)
                {
                    response.isSuccess = false;
                    response.message = "User not found.";
                    return NotFound(response);
                }
                response.isSuccess = true;
                response.message = "User deleted successfully.";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
                return BadRequest(response);
            }
        }







    }
}
