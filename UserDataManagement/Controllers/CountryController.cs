using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserData.Repository.DataModels;
using UserData.Repository.DTO;
using UserData.Services.Interface;
using UserData.Services.Repositories;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace UserDataManagement.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class CountryController : Controller
    {
        private readonly ICountryService _countryService;
        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [AllowAnonymous]
        [HttpGet("GetCountries")]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountryList()
        {
            var response = new ResponseDTO();
            try
            {
                var data = await _countryService.GetCountries();
                response.isSuccess = true;
                response.data = data;
                response.message = "Countries Data fetched successfully";
                return Ok(response);
            }
            catch
            {
                response.isSuccess = false;
                response.message = "Error fetching the countries data";
                return BadRequest(response);
            } 
        }

        
        [HttpGet("GetCountryById/{id}")]
        public async Task<IActionResult> GetCountryById(int id)
        {
            var response = new ResponseDTO();
            try
            {
                var data = await _countryService.GetCountryById(id);
                response.isSuccess = true;
                response.message = "Fetched country data";
                response.data = data;
                return Ok(response);
            }
            catch
            {
                response.isSuccess = false;
                response.message = "Error Fetching country data";
                return Ok(response);
            }
        }

        [HttpPost("AddCountry")]
        public async Task<IActionResult> AddCountry(Country model)
        {
            var response = new ResponseDTO();
            try
            {

                var res = await _countryService.addCountry(model);
                if (res)
                {
                    response.isSuccess = true;
                    response.message = "Country Added Successfully";
                    return Ok(response);
                }
                response.isSuccess = false;
                response.message = "Country not Added";
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
                return BadRequest(response);
            }
        }


        [HttpPut("UpdateCountry/{id}")]
        public async Task<IActionResult> UpdateCountryData(int id,Country model)
        {
            var response = new ResponseDTO();

            try
            {
                var res = await _countryService.updateCountryData(id,model);
                if (res == 0)
                {
                    response.isSuccess = false;
                    response.message = "Country not found";
                    return NotFound(response);
                }
                response.isSuccess = true;
                response.message = "Country Data Updated Successfully";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
                return BadRequest(response);
            }
        }


        [HttpDelete("DeleteCountry/{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var response = new ResponseDTO();
            try
            {
                var result = await _countryService.DeleteCountry(id);
                if (result == 0)
                {
                    response.isSuccess = false;
                    response.message = "Country not found.";
                    return NotFound(response);
                }
                response.isSuccess = true;
                response.message = "Country deleted successfully";
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
