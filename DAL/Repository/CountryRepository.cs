using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataContext;
using UserData.Repository.DataModels;
using UserData.Repository.Interface;

namespace UserData.Repository.Repository
{
    public class CountryRepository : ICountryRepository
    {
        private readonly ApplicationDbContext _context;
        public CountryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Country> GetCountryById(int id)
        {
            return await _context.Countries.FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<List<Country>> GetCountries()
        {
            return  _context.Countries.Where(x=>x.Isdeleted == false).OrderBy(x => x.Id).ToList();
        }

        public async Task<bool> addCountry(Country model)
        {
            if (model.Name != null)
            {
                Country country = new Country();
                country.Name = model.Name;
                country.Description = model.Description;
                country.FlagUrl = model.FlagUrl;
                country.Createddate = DateTime.Now;
                _context.Countries.Add(country);
                _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<int> updateCountryData(int id, Country model)
        {
            var country  = _context.Countries.FirstOrDefault(c => c.Id == id);
            if (country != null)
            {
                country.Name = model.Name;
                country.Description = model.Description;
                country.FlagUrl = model.FlagUrl;
                country.Modifieddate = DateTime.Now;
                _context.Entry(country).State = EntityState.Modified;
                return await _context.SaveChangesAsync();
            }
            return 0;
        }
        public async Task<int> DeleteCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null)
            {
                return 0;
            }

            country.Isdeleted = true;
            country.Deleteddate = DateTime.Now;
            _context.Entry(country).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
    }
}
