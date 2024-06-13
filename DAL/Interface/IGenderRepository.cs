using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DataModels;

namespace UserData.Repository.Interface
{
    public interface IGenderRepository
    {
        public Task<List<Gender>> GetGenderList();

    }
}
