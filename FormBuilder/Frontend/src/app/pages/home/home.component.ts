import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormServiceService } from '../../services/form-service.service';
import { Forms } from '../../shared/models/form';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  savedForms: Forms[] = [];

  constructor(
    private formServiceService: FormServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getForms();
  }

  getForms(){
    this.formServiceService.getForms().subscribe((forms) => {
      // console.log(forms);
      this.savedForms = forms;
      // console.log(forms[0]["questions"][0]["answers"][0]["answerText"])
    });
  }

  previewForm(form: Forms) {

    setTimeout(()=>{
      this.formServiceService.setFormData(form);
      this.router.navigate(['/previewsaved']);

    }, 400)
  }

  copyForm(form: Forms) {
    console.log(form.questions);

    // form.formId = 0;
    // form.formName = `Copy of  ${form.formName}`;

    this.formServiceService.copyForm(form.formId).subscribe(
      (res) => {
        console.log('Form copied successfully', res);
        this.getForms();
      },
      (err) => {
        console.log('Form failed to copy');
      }
    );
  }


  editForm(form : any){

  }
  delete(id: number){
    console.log(id);
    
    alert("Do u really want to delete it?")
    this.formServiceService.deleteForm(id).subscribe((res)=>{
      console.log("Form Deleted Successfully");
      alert("Form Deleted");
      this.getForms()
      
    },
    (err)=>{
      console.log("Error Occured while deleting form");
      
    }
  )

  }

  navigateToCreateForm() {
    this.formServiceService.clearQuestions();
    this.router.navigate(['/form']);
  }

}
