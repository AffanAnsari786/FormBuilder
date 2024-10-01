using Database.DbEntities;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class InboxContext(DbContextOptions<InboxContext> options) : DbContext(options)
    {
        public DbSet<Form> FormsAffan { get; set; }
        public DbSet<Question> QuestionsAffan { get; set; }
        public DbSet<Answer> AnswerOptionsAffan { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server=172.16.1.90;uid=TTA2024;pwd=Rizvi@2024;database=RizviTTA;Min Pool Size=5;Max Pool Size=500;TrustServerCertificate=True;MultipleActiveResultSets=True;Command timeout=500");
                optionsBuilder.EnableSensitiveDataLogging();
                //Server = 172.16.1.90; Database = RizviTTA; User Id = TTA2024; Password = Rizvi@2024;
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Form>().HasKey(f => f.FormId);
            modelBuilder.Entity<Question>().HasKey(q => q.QuestionId);
            modelBuilder.Entity<Answer>().HasKey(a => a.AnswerOptionId);
        }

        
       
    }
}
