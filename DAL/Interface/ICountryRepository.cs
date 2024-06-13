using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;
using UserData.Repository.Repository;

namespace UserData.Repository.Interface
{
    public interface ICountryRepository 
    {
        public Task<Country> GetCountryById(int id);
        public Task<List<Country>> GetCountries();
        public Task<bool> addCountry(Country model);
        public Task<int> updateCountryData(int id,Country model);
        public Task<int> DeleteCountry(int id);
    }
}
