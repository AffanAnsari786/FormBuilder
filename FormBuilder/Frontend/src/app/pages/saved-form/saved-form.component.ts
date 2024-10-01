import { Component, OnInit } from '@angular/core';
import { FormServiceService } from '../../services/form-service.service';
import { Forms } from '../../shared/models/form';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-form.component.html',
  styleUrl: './saved-form.component.scss',
})
export class SavedFormComponent implements OnInit {
  savedForms: Forms[] = [];

  constructor(
    private formServiceService: FormServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getForms();
  }

  getForms() {
    this.formServiceService.getForms().subscribe((forms) => {
      // console.log(forms);
      this.savedForms = forms;
      // console.log(forms[0]["questions"][0]["answers"][0]["answerText"])
    });
  }

  previewForm(form: Forms) {
    this.formServiceService.setFormData(form);
    this.router.navigate(['/previewsaved'], { state: { form: form } });
  }

  copyForm(form: Forms) {
    console.log(form.questions);

    // form.formId = 0;
    // form.formName = `Copy of  ${form.formName}`;

    this.formServiceService.copyForm(form.formId).subscribe(
      (res) => {
        console.log('Form copied successfully');
        this.getForms();
      },
      (err) => {
        console.log('Form failed to copy');
      }
    );
  }
}
