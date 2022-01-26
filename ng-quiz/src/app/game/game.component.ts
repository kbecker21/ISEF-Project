import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/model/question.model';
import { Answer } from '../shared/model/answer.model';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../shared/services/quiz.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user.model';
import { Subscription } from 'rxjs';
import { LobbyService } from '../shared/services/lobby.service';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  loggedInUser: User = null;
  userSub: Subscription = null;

  player1: User = null;
  player2 = null;

  currentPlayerPoints = 0;

  questions: Question[] = [];

  currentQuestion: Question = null;
  currentAnswers: Answer[] = [];
  currentCorrectAnswer: Answer = null;

  questionNumber = 0;

  disableNextQuestionButton = true;
  disableAnswerButton = false;
  displayEndGameButton = false;


  currentGameSub: Subscription = null;
  questionSub: Subscription = null;
  answersSub: Subscription = null;


  // TODO: erst prüfen ob genug Fragen geladen wurden etc....
  // this.questions.length >=10
  //showGame = this.currentQuestion != null && this.currentAnswers != null;
  showGame = true;

  constructor(private auth: AuthService, public dialog: MatDialog, private quizService: QuizService, private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });
    this.initGame();
  }


  initGame() {
    this.player1 = this.loggedInUser;


    //   TODO: kann weg 
    this.player2 = {
      idUser: 2,
      firstName: "Max",
      lastName: "Mustermann"
    };


    this.currentGameSub = this.lobbyService.getAllOpenedGames(this.player1).subscribe(response => {
      response.forEach(quiz => {
        // TODO: set kurs
        // TODO: set kategorie
        if (quiz.idJoinerUser == this.player1.idUser && quiz.idCreatorUser != null) {
          // TODO: this.player2 = getUser(quiz.idCreatorUser) 
        }
        if (quiz.idCreatorUser == this.player1.idUser && quiz.idJoinerUser != null) {
          // TODO: this.player2 = getUser(quiz.idJoinerUser) 
        }
      });
    },
      errorMessage => {
        console.log(errorMessage);
      });

    this.initQuestionsInGame();

  }

  initQuestionsInGame() {
    const idSubject = 1;
    const idCategory = 1;
    this.questionSub = this.quizService.getQuestions(this.loggedInUser, idSubject, idCategory).subscribe(response => {
      this.questions = response;
      this.currentQuestion = this.questions[this.questionNumber];
      this.questionNumber++;
      this.initAnswersForQuestion(this.currentQuestion.idQuestion);
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }



  initAnswersForQuestion(idQuestion: number) {
    this.answersSub = this.quizService.getAnswers(this.loggedInUser, idQuestion).subscribe(response => {
      this.currentCorrectAnswer = response.find(answer => answer.Truth == 1);
      this.currentAnswers = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  selectAnswer(answer: Answer) {
    if (answer.Truth == 1) {
      this.currentPlayerPoints += 10;
      this.openDialog(true, 'Super gemacht, weiter so.');
    } else {
      this.openDialog(false, 'Die richtige Antwort ist: \n' + this.currentCorrectAnswer.Description);
    }
    this.disableNextQuestionButton = false;
    this.disableAnswerButton = true;
  }


  nextQuestion() {
    if (this.questionNumber < 10) {
      this.currentQuestion = this.questions[this.questionNumber];
      this.questionNumber++;
      this.initAnswersForQuestion(this.currentQuestion.idQuestion);
    }
    if (this.questionNumber == 10) {
      this.displayEndGameButton = true;
    }
    this.disableAnswerButton = false;
  }

  finishGame() {
    // TODO: send result;
  }


  openDialog(isCorrect: boolean, answer: string) {
    this.dialog.open(DialogComponent, {
      data: {
        isCorrect: isCorrect,
        answer: answer,
      },
    });
  }


}
