using Database.DbEntities;

namespace Database.ModelEntities
{
    public class previewModel
    {
        public int questionNumber { get; set; }
        public string questionType { get; set; }
        public string question { get; set; }
        public List<Answer> Answers { get; set; }
    }
}
