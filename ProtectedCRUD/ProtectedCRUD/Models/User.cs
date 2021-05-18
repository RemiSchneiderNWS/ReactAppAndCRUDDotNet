using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProtectedCRUD.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        public int id { get; set; }       
        public string email { get; set; }

        public string password { get; set; }
 
        public string token { get; set; }

    }
}
