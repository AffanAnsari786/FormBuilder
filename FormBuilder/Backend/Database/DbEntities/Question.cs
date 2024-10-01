using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.DbEntities
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set;}
        public string QuestionText { get; set;}
        public string QuestionType {  get; set;}
        public List<Answer> Answers { get; set;}
    }
}
