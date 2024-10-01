using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.DbEntities
{
    public class Answer
    {
        [Key]
        public int AnswerOptionId { get; set; }
        public string AnswerText { get; set; }
    }
}
