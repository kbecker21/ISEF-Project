import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user.model';
import { QuestionList } from '../shared/model/questionlist.model';
import { QuestionsService } from '../shared/services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../shared/model/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  userSub: Subscription = null;
  allQuestions: Subscription = null;
  loggedInUser: User = null;
  dataSource: QuestionList[] = [];

  courseID: number;
  editMode = false;
  

  private routeSub: Subscription;

  constructor(private auth: AuthService, private questionsService: QuestionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });
    
    this.routeSub = this.route.params.subscribe(params => {
      this.courseID = params['id'];
    });

    this.getbyCourse(this.courseID);
  }

  getbyCourse(courseId: number) {
    this.allQuestions = this.questionsService.getByCourse(this.loggedInUser, courseId).subscribe(data => {
      this.dataSource = data; 
      console.log(data);     
    });    
  }

  saveQuestion(question: Question) {
    if(question.idQuestion) {
      this.questionsService.update(this.loggedInUser, question).subscribe(data => {
        console.log(data);
      });
    } else {
      this.questionsService.create(this.loggedInUser, question).subscribe(data => {
        console.log(data);
      });
    }
    
  }

  deleteQuestion(question: Question) {
    if (confirm('Möchtest du die Frage wirklich löschen?')) {
      this.questionsService.delete(this.loggedInUser, question.idQuestion).subscribe(data => {
        console.log(data);
     },
     errorMessage => {
        console.log(errorMessage);
      });
    }
  }

  toggleActivate(question: Question) {
    question.Approved = !question.Approved;
    this.questionsService.update(this.loggedInUser, question).subscribe(data => {
      console.log(data);
    });
  }

}

