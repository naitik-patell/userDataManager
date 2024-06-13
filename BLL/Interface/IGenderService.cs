using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;

namespace UserData.Services.Interface
{
    public interface IGenderService
    {
        public Task<List<Gender>> GetGenderList();

    }
}
