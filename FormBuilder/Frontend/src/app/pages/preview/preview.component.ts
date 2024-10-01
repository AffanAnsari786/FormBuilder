import { Component, OnInit } from '@angular/core';
import { FormServiceService } from './../../services/form-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PreviewAllQuestion } from '../../shared/models/preview';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {

  formName1: string = 'Default';
  isFormNameModalOpen: boolean = false;
  questions: PreviewAllQuestion[] = [];

  constructor(private formServiceService: FormServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  gotoHome(){   
    this.router.navigate(['/form'])
  }

  getAllQuestions() {
    this.formServiceService.questions$.subscribe(questions => {
      this.questions = questions;
    });
  }

  // Open modal for form name input
  openFormNameModal() {
    this.isFormNameModalOpen = true;
  }

  // Close modal without saving
  closeFormNameModal() {
    this.isFormNameModalOpen = false;
  }

  saveForm() {
    console.log("saveform function we have reached")
    const form = {
      formId: 0,
      formName: this.formName1,
      questions: this.questions.map(q => ({
        questionId: 0,
        questionType: q.questionType,
        questionText: q.question,
        answers: q.answers.map(a => ({
          answerOptionId: 0,
          answerText: a.answer
        }))
      }))
    };
    console.log(this.questions);
    this.formServiceService.saveForm(form).subscribe(
      response => console.log('Form saved successfully', response),
      error => console.error('Error saving form', error)
    );
    alert("Form saved successfully")
    this.router.navigate(['/home']);
  }
}
