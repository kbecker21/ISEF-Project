import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/model/question.model';
import { Answer } from '../shared/model/answer.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { QuizService } from '../shared/services/quiz.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  loggedInUser: User = null;
  userSub: Subscription = null;

  player1 = null;
  player2 = null;

  player1Points = 0;
  player2Points = 0;

  questions: Question[] = [];

  currentQuestion: Question = null;
  currentAnswers: Answer[] = [];

  questionNumber = 0;

  disableNextQuestionButton = true;
  disableAnswerButton = false;


  questionSub: Subscription = null;
  answersSub: Subscription = null;


  constructor(private auth: AuthService, public dialog: MatDialog, private quizService: QuizService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
      this.player1 = this.loggedInUser;
    });

    this.dummyCreateQuiz();

    this.dummyGetNewQuestion();

    this.getQuiz();

    this.getQuestion();

    this.getAnswers();


  }

  getQuiz() {
    //TODO: setzt Spieler, Kurs, Kategorie
  }

  getQuestion() {
    const idSubject = 1;
    const idCategory = 1;
    this.questionSub = this.quizService.getQuestion(this.loggedInUser, idSubject, idCategory).subscribe(response => {
      // TODO: 
    },
      errorMessage => {
        console.log(errorMessage);
      });


    this.currentQuestion = this.questions[this.questionNumber];
    this.questionNumber++;
  }

  getAnswers() {
    const idQuestion = 1;
    this.answersSub = this.quizService.getAnswers(this.loggedInUser, idQuestion).subscribe(response => {
      this.currentAnswers = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  selectAnswer(answer: Answer) {
    if (answer.Truth) {
      this.openDialog(true, 'Super gemacht, weiter so.');
    } else {
      this.openDialog(false, 'Die richtige Antwort ist xy.');
    }
    this.disableNextQuestionButton = false;
  }

  openDialog(isCorrect: boolean, answer: string) {
    this.dialog.open(DialogComponent, {
      data: {
        isCorrect: isCorrect,
        answer: answer,
      },
    });
  }


  nextQuestion() {
    this.currentQuestion = this.questions[this.questionNumber];
    this.questionNumber++;
  }

  dummyGetNewQuestion() {

    let question1: Question = {
      idQuestion: 1,
      category_idcategory: 1,
      QuestionDescription: "Wer war der 44. Präsident der USA?",
      Approved: 1,
      CreateDate: ""
    }

    let question2: Question = {
      idQuestion: 2,
      category_idcategory: 2,
      QuestionDescription: "Wer war der 1. Präsident der USA?",
      Approved: 1,
      CreateDate: ""
    }


    let question3: Question = {
      idQuestion: 3,
      category_idcategory: 3,
      QuestionDescription: "Wer war der 3. Präsident der USA?",
      Approved: 1,
      CreateDate: ""
    }

    this.questions.push(question1, question2, question3);
  }

  dummyCreateQuiz() {
    this.player1 = {
      idUser: 1,
      firstName: "Kevin",
      lastName: "Becker"
    };

    this.player2 = {
      idUser: 2,
      firstName: "Max",
      lastName: "Mustermann"
    };



  }

}
