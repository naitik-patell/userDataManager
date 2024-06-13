using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;

namespace UserData.Services.Interface
{
    public interface ICountryService
    {
        public Task<List<Country>> GetCountries();
        public Task<Country> GetCountryById(int id);
        public Task<bool> addCountry(Country model);
        public Task<int> updateCountryData(int id,Country model);
        public Task<int> DeleteCountry(int id);
    }
}
