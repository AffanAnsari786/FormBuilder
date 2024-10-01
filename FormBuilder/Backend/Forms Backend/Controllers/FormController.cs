using Database;
using Database.DbEntities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Forms_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : ControllerBase
    {

        private readonly InboxContext _context;
        public FormController(InboxContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> postForm([FromBody] Form form)
        {

            if (form == null)
            {
                return BadRequest("Form is null");
            }

            form.FormId = 0;
            for (int i = 0; i < form.Questions.Count; i++)
            {
                form.Questions[i].QuestionId = 0;
                for (int j = 0; j < form.Questions[i].Answers.Count; j++)
                {
                    form.Questions[i].Answers[j].AnswerOptionId = 0;

                }
            }

            _context.FormsAffan.Add(form);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Form saved successfully" });
        }


        [HttpGet]
        public async Task<IActionResult> getForm()
        {
            var forms = await _context.FormsAffan.Include(f=>f.Questions)
                .ThenInclude(q=>q.Answers)
                .ToListAsync();

            return Ok(forms);

        }


        [HttpDelete]
        public async Task<IActionResult> deleteForm(int formId)
        {
            var form = await _context.FormsAffan.Include(f=>f.Questions)
                .ThenInclude(q=>q.Answers).FirstOrDefaultAsync(f=> f.FormId == formId);


            if (form == null)
            {
                return BadRequest("Form Doesnt Exists");

            }


            foreach (var question in form.Questions) 
            {
                foreach (var answer in question.Answers)
                {

                    _context.AnswerOptionsAffan.Remove(answer);

                }
                _context.QuestionsAffan.Remove(question);

            }

            _context.FormsAffan.Remove(form);



            await _context.SaveChangesAsync();

           
            return Ok(form);

        }



        [HttpPost("copy")]
        public async Task<IActionResult> copyForm([FromBody] int formId)
        {
            if(formId <= 0)
            {
                return BadRequest("Invalid form ID.");
            }

           
            await _context.Database.ExecuteSqlRawAsync("EXEC CopyForm_Affan @formId", new SqlParameter("@formId", formId));

           
            var newFormId = await _context.FormsAffan.OrderByDescending(f => f.FormId).Select(f => f.FormId).FirstOrDefaultAsync();

            if (newFormId <= 0)
            {
                return BadRequest("Failed to copy form.");
            }

            return Ok(new { message = "Form copied successfully", NewFormId = newFormId });
        }

    }
}
