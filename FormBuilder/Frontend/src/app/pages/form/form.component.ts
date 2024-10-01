import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { CommonModule } from '@angular/common';
import { PreviewAllQuestion } from '../../shared/models/preview';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatMenuModule, MatIcon],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  selectedQuestionType: string = "text"
  questionText: string = '';
  modal: boolean = false;
  isOptionsRequired = false;
  questionOptions: string[] = [''];
  addedQuestions: PreviewAllQuestion[] = [];
  textTypeText: string ='';
  isEditMode = false; // New flag to check if editing mode is on
  editingIndex: number | null = null;
  questions: PreviewAllQuestion[] = [];
  currentQuestionNumber: number = 1;

  constructor(private formDataService: FormServiceService ,
    private router: Router, 
    private cdRef: ChangeDetectorRef
  ){

      this.formDataService.questions$.subscribe(questions => {
        this.questions = questions;
      });
      
    }

  editQuestion(question: PreviewAllQuestion, index: number) {
    this.isEditMode = true;
    this.editingIndex = index;
    console.log(question.question);

    this.questionText = question.question;

    this.selectedQuestionType = question.questionType
    this.questionOptions = question.answers.map(x =>x.answer);

    this.cdRef.detectChanges(); 
    
    this.handleQuestionTypeChange()


    
      // this.addedQuestions.splice(id, 1)
      
 }



    copyQuestion(question: any){      
      const newData = {
        questionNumber: this.currentQuestionNumber,
        questionType: question.questionType,
        question: question.question,
        answers: question.answers
        
      }

      console.log(newData);
      
      
      this.addedQuestions.push(newData);
      // console.log(question);
      
      this.currentQuestionNumber++;
      this.formDataService.setQuestions(this.addedQuestions)
      this.formDataService.updateQuestions(this.addedQuestions);

      this.questionText = '';
      this.textTypeText = ''
      this.questionOptions=[];
      this.questionOptions.push('')

    }
    

    previewQuestions() {
      // Navigate to preview component or handle preview logic
      this.router.navigate(['preview']);
    }

    goToSavedForms(){
      this.router.navigate(['/saved-forms']);
    }
   

    addQuestion() {
    
      let duplicateFound = false;
    
      for (let i = 0; i < this.questionOptions.length; i++) {
        let answer = this.questionOptions[i];
        let currentIndex = i;
    
        this.questionOptions.forEach((option, index) => {
          if (option === answer && index !== currentIndex) {
            alert("Please do not give the same answer");
            duplicateFound = true;
            return; 
          }
        });
    
        if (duplicateFound) {
          return; 
        }
      }

      if (this.questionText) {
        const newQuestion = {
          questionNumber: this.currentQuestionNumber,
          questionType: this.selectedQuestionType,
          question: this.questionText,
          answers:
            this.questionOptions.length > 0
              ? this.questionOptions.map((option, index) => ({
                  answerId: index + 1,
                  questionNumber: this.currentQuestionNumber,
                  answerOptionNumber: index + 1,
                  answer: option,
                }))
              : [],
        };
    
        console.log(newQuestion);
    

        this.addedQuestions.push(newQuestion);
        this.currentQuestionNumber++;
    
        this.formDataService.setQuestions(this.addedQuestions);
        this.formDataService.updateQuestions(this.addedQuestions);

        this.questionText = '';
        this.textTypeText = '';
        this.questionOptions = ['']; 
      } else {
        alert("Enter Question");
      }
    }
    
deletequestion(index : number){
  this.addedQuestions.splice(index, 1)
}

  handleQuestionTypeChange(){
    if (this.selectedQuestionType) {
      this.isOptionsRequired = this.selectedQuestionType !== 'text';
      // console.log(this.isOptionsRequired);
      
    }
    this.questionText = ''
  }


  addOption(answer: string[]) {

    // console.log(answer)
    // for(i=0, i< answer.length; i++){
    //   if(answer[i] == answer[i+1]){

    //   }
    // }
    // if(answer==null){
    //   alert("please add Something")
    // }
    this.questionOptions.push(''); // Add a new empty option
    console.log(this.questionOptions);
    
  }
  removeOption(index: number) {
    this.questionOptions.splice(index, 1); // Remove the option at the specified index
  }
  trackByFn(index: number, item: string) {
    return index; // or return item if you want to use the value
  }


 
}
