import { Injectable } from '@angular/core';
import { PreviewAllQuestion } from '../shared/models/preview';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Forms } from '../shared/models/form';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {

  private formData!: Forms;
  private apiUrl = environment.apiUrl
  private questions: PreviewAllQuestion[] = [];

  constructor(private http: HttpClient) {}

  private questionsSubject = new BehaviorSubject<PreviewAllQuestion[]>([]);
  questions$ = this.questionsSubject.asObservable();


  saveForm(form: any): Observable<any> {
    console.log(form);
    
    return this.http.post(`${this.apiUrl}`, form);
  }
  
  copyForm(formId : any){
    console.log(formId);
    
    return this.http.post(`${this.apiUrl}/copy`, formId);

  }
  getForms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  deleteForm(formId: number): Observable<any> {
    const params = new HttpParams().set('formId', formId.toString());
    // const params = formId.toString()
    console.log(typeof(params));
    
    return this.http.delete(this.apiUrl, { params })
  }



  setFormData(data: Forms) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }
  updateQuestions(questions: PreviewAllQuestion[]) {
    this.questionsSubject.next(questions);
  }

  setQuestions(questions: any[]) {
    this.questions = questions;
  }

  getQuestion() {
    return this.questions;
  }
  clearQuestions() {
    this.questions = [];
  }

  // backendUrl = environment.backendUrl;

  // getAllQuestion(): Observable<any> {
  //   return this.http.get<any>(`${this.backendUrl}/preview`);
  // }


  // addNew(data: PreviewAllQuestion): Observable<any> {
  //   const final = {
  //     questionNumber: data.questionNumber, // This should be set correctly
  //     questionType: data.questionType,
  //     question: data.question,
  //     Answers: data.answers.map(answer => answer.answer), // Ensure you're sending the correct answer text
  //   };
  //   return this.http.post<any>(`${this.backendUrl}/addQuestion`, final);
  // }
  

  // deleteQuestion(questionNumber: number): Observable<any> {
  //   return this.http.post<any>(`${this.backendUrl}/delete`, questionNumber);
  // }
}
