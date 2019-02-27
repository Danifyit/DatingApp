using DatingApp.API.Data.Interfaces;
using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.Implemantations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public Task<User> Login(string username, string password)
        {
            throw new NotImplementedException();
        }

        public Task<User> Register(User user, string username, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePassWordHash(password, out passwordHash, out passwordSalt);

        }

        private void CreatePassWordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key; //Generates a random key
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public Task<bool> UserExist(string username)
        {
            throw new NotImplementedException();
        }
    }
}
