﻿using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> RegisterAsync (User user, string password);
        Task<User> Login (string username, string password);
        Task<bool> UserExist (string username);
    }
}
