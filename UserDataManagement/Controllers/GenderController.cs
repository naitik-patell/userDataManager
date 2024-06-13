using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserData.Repository.DataModels;
using UserData.Repository.DTO;
using UserData.Services.Interface;
using UserData.Services.Services;

namespace UserDataManagement.Controllers
{

    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class GenderController : Controller
    {
        private IGenderService _genderService;
        public GenderController(IGenderService genderService)
        {
            _genderService = genderService;
        }

        [AllowAnonymous]
        [HttpGet("")]
        public async Task<ActionResult> GetGenderList()
        {
            var response = new ResponseDTO
            {
                isSuccess = true,
                message = "fetched the genders data",
                data = await _genderService.GetGenderList()
            };
            return Ok(response);
        }
    }
}
