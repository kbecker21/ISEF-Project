import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/model/question.model';
import { Answer } from '../shared/model/answer.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  player1 = null;
  player2 = null;

  player1Points = 0;
  player2Points = 0;

  question: Question = null;
  answers: Answer[] = [];

  questionNumber = 0;

  disableNextQuestionButton = true;
  disableAnswerButton = false;



  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dummyCreateQuiz();

    this.dummyGetNewQuestion();
  }

  selectAnswer(answer: Answer) {
    if (answer.Truth) {
      this.openDialog(true, 'Super gemacht, weiter so.');
      this.disableNextQuestionButton = false;
    } else {
      this.openDialog(false, 'Die richtige Antwort ist xy.');
      this.disableNextQuestionButton = false;
    }
  }

  openDialog(isCorrect: boolean, answer: string) {
    this.dialog.open(DialogComponent, {
      data: {
        isCorrect: isCorrect,
        answer: answer,
      },
    });
  }

  dummyGetNewQuestion() {
    this.questionNumber++;

    this.question = {
      idQuestion: 1,
      category_idcategory: 1,
      QuestionDescription: "Wer war der 44. Präsident der USA?",
      Approved: 1,
      CreateDate: ""
    }

    const answer1: Answer = {
      idAnswers: 1,
      Question_idQuestion: 1,
      Description: "Donald Trump",
      Truth: 0
    };

    const answer2: Answer = {
      idAnswers: 2,
      Question_idQuestion: 1,
      Description: "Barack Obama",
      Truth: 1
    };

    const answer3: Answer = {
      idAnswers: 3,
      Question_idQuestion: 1,
      Description: "Richard Nixon",
      Truth: 0
    };

    const answer4: Answer = {
      idAnswers: 4,
      Question_idQuestion: 1,
      Description: "George Bush",
      Truth: 0
    };

    this.answers.push(answer1, answer2, answer3, answer4);
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
