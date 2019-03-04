using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        [StringLength(50)]
        public String Username { get; set; }
        public byte [] PasswordHash { get; set; }
        public byte [] PasswordSalt { get; set; }
    }
}
