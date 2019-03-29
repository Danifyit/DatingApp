using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models
{
    public class Like
    {
        //user gillar en annan användare
        public int LikerId { get; set; }
        //en användare blir gillad av andra
        public int LikeeId { get; set; }
        public User Liker { get; set; }
        public User Likee { get; set; }
    }
}
