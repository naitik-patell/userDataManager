using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;
using UserData.Repository.Interface;
using UserData.Services.Interface;

namespace UserData.Services.Services
{
    public class GenderService : IGenderService
    {
        private readonly IGenderRepository  _genderrepository;
        public GenderService(IGenderRepository genderRepository) 
        {
            _genderrepository = genderRepository;
        }
        public Task<List<Gender>> GetGenderList()
        {
            try
            {
                return _genderrepository.GetGenderList();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving users. Please try again later.");
            }
        }
    }
}
