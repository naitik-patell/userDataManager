using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;
using UserData.Repository.Interface;
using UserData.Repository.Repository;
using UserData.Services.Interface;

namespace UserData.Services.Services
{
    public class CountryService : ICountryService
    {
        private readonly ICountryRepository _countryRepository;
        
        public CountryService(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }
        public Task<Country> GetCountryById(int id)
        {
            try
            {
                return _countryRepository.GetCountryById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving users. Please try again later.");
            }
        }

        public Task<bool> addCountry(Country model)
        {
            try
            {
                return _countryRepository.addCountry(model);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding  to countries table. Please try again later.");
            }
        }

        public async Task<List<Country>> GetCountries()
        {
            try
            {
                return  await _countryRepository.GetCountries();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving users. Please try again later.");
            }
        }

        public Task<int> updateCountryData(int id, Country model)
        {
            try
            {
                return _countryRepository.updateCountryData(id,model);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating  to countries table. Please try again later.");
            }

        }
        public Task<int> DeleteCountry(int id)
        {
            try
            {
                return _countryRepository.DeleteCountry(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the country. Please try again later.");
            }

        }
    }
}
