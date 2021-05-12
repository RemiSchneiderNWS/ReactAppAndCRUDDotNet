using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace simpleCRUDwithProtection.Models
{   
    [Table("material")]
    public class material
    {
        [Key]
        public int id { get; set; }
        public string Name { get; set; }
    }
}
