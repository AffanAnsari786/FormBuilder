import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormServiceService } from '../../services/form-service.service';
import { PreviewAllQuestion } from '../../shared/models/preview';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previewsaved',
  standalone: true,
  imports: [CommonModule, RouterLink],
templateUrl: './previewsaved.component.html',
  styleUrl: './previewsaved.component.scss'
})
export class PreviewsavedComponent implements OnInit{

  form!:any;
  questions: any[] = [];
  constructor(private router: Router,private route: ActivatedRoute,
    private formServiceService : FormServiceService
  ) {}


  ngOnInit() {
    this.getFormDetail();
    
  }

  getFormDetail(){
    this.form=this.formServiceService.getFormData();
    console.log(this.form);
    
    this.questions = this.form["questions"];
    console.log(this.questions);
  }
}
