using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.DbEntities
{
    public class Form
    {

        [Key]
        public int FormId {  get; set; }
        public string FormName { get; set; }

        public List<Question> Questions { get; set; }
    }
}
