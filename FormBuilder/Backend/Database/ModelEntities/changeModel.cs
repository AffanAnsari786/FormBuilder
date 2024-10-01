using Database.DbEntities;

namespace Database.ModelEntities
{
    public class changeModel
    {
        public int questionNumber { get; set; }
        public string questionType { get; set; }
        public string question { get; set; }
        public string[] Answers { get; set; }
    }
}
