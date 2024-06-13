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
    public class GenderRepository :IGenderRepository
    {
        private readonly ApplicationDbContext _context;

        public GenderRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Gender>> GetGenderList()
        {
            return  _context.Genders.OrderBy(g => g.Id).ToList();
        }
    }
}
