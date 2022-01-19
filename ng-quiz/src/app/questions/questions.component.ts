import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user.model';
import { QuestionList } from '../shared/model/questionlist.model';
import { QuestionsService } from '../shared/services/questions.service';
import { AnswerService } from '../shared/services/answer.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../shared/model/question.model';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { AddAnswerDialogComponent } from './add-answer-dialog/add-answer-dialog.component';
import { filter } from 'rxjs/operators';
import { Answer } from '../shared/model/answer.model';

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
  panel = 0;

  isLoading = true;
  

  private routeSub: Subscription;

  constructor(private auth: AuthService, private questionsService: QuestionsService, private answerService: AnswerService, private route: ActivatedRoute, private dialog: MatDialog) { }

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
    this.isLoading = true;
    this.allQuestions = this.questionsService.getByCourse(this.loggedInUser, courseId).subscribe(data => {
      this.isLoading = false;
      this.dataSource = data; 
      console.log(data);     
    });    
  }

  saveQuestion(question: Question) {
    if(question.idQuestion) {
      this.isLoading = true;
      this.questionsService.update(this.loggedInUser, question).subscribe(data => {
        this.isLoading = false;
        this.getbyCourse(this.courseID);
      });
    } else {
      this.questionsService.create(this.loggedInUser, question).subscribe(data => {
        this.isLoading = false;
        this.getbyCourse(this.courseID);       
      });
    }
    
  }


  saveAnswer(answer: Answer) {
    if(answer.idAnswers) {
      this.answerService.update(this.loggedInUser, answer).subscribe(data => {
        this.getbyCourse(this.courseID);
        
      });
    } else {
      this.answerService.create(this.loggedInUser, answer).subscribe(data => {
        this.getbyCourse(this.courseID);
      });
    }
    
  }

  deleteQuestion(question: Question) {
    if (confirm('Möchtest du die Frage wirklich löschen?')) {
      this.questionsService.delete(this.loggedInUser, question.idQuestion).subscribe(data => {
        console.log(data);
        this.getbyCourse(this.courseID);
     },
     errorMessage => {
        console.log(errorMessage);        
      });
    }
  }

  deleteAnswer(answer: Answer) {
    if (confirm('Möchtest du die Antwort wirklich löschen?')) {
      this.answerService.delete(this.loggedInUser, answer.idAnswers).subscribe(data => {
        console.log(data);
        this.getbyCourse(this.courseID);
     },
     errorMessage => {
        console.log(errorMessage);
      });
    }
  }

  toggleActivate(question: Question) {
    question.Approved = question.Approved === 1 ? 0 : 1;
          
    this.questionsService.update(this.loggedInUser, question).subscribe(data => {
      console.log(question);
      this.getbyCourse(this.courseID);
    });
  }

  toggleTruth(answer: Answer) {    
    if (answer.Truth == 1) {
      answer.Truth = 0;      
    } else {
      answer.Truth = 1;
    }          
    this.answerService.update(this.loggedInUser, answer).subscribe(data => {
      console.log(answer);
      this.getbyCourse(this.courseID);
    });
  }

  newQuestion(categoryID) {
    console.log(categoryID);
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
  
    dialogConfig.data = {
      category_idcategory: categoryID,
  };
  
  const dialogRef = this.dialog.open(AddQuestionDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
      .pipe(filter(data => data))
      .subscribe(data => this.saveQuestion(data)
  );    
  }


  newAnswer(questionID) {
    console.log(questionID);
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
  
    dialogConfig.data = {
      Question_idQuestion : questionID,
  };
  
  const dialogRef = this.dialog.open(AddAnswerDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
      .pipe(filter(data => data))
      .subscribe(data => this.saveAnswer(data)
  );    
  }

 
  setPanelID(panelid: number) {
    this.panel = panelid;
  }

}

