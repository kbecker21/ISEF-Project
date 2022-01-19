import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/model/question.model';
import { Answer } from '../shared/model/answer.model';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/services/user.service';

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

  timer = 60;


  constructor() { }

  ngOnInit(): void {
    this.dummyCreateQuiz();

    this.dummyGetNewQuestion();

  }

  dummyGetNewQuestion() {
    this.questionNumber++;

    this.question = {
      idQuestion: 1,
      category_idcategory: 1,
      QuestionDescription: "Wer war der 44. Präsident der USA?",
      Approved: true,
      CreateDate: ""
    }

    const answer1: Answer = {
      id: 1,
      Description: "Donald Trump",
      Truth: false
    };

    const answer2: Answer = {
      id: 2,
      Description: "Barack Obama",
      Truth: true
    };

    const answer3: Answer = {
      id: 3,
      Description: "Richard Nixon",
      Truth: false
    };

    const answer4: Answer = {
      id: 4,
      Description: "George Bush",
      Truth: false
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
