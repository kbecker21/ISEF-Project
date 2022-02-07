import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/model/question.model';
import { Answer } from '../shared/model/answer.model';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../shared/services/quiz.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/model/user.model';
import { Subscription, throwError } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { QuestionsService } from '../shared/services/questions.service';
import { Router } from '@angular/router';

interface Player2 {
  Email: string,
  FirstName: string,
  LastName: string,
  idUser: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  loggedInUser: User = null;
  userSub: Subscription = null;

  successMsg = false;

  player1: User = null;
  player2: Player2 = null;

  currentQuizId = null

  currentSubject = null;
  currentSubjectId = null;
  currentCategory = null;
  currentCategoryId = null;

  currentPlayerPoints = 0;

  questions: Question[] = [];

  currentQuestion: Question = null;
  currentAnswers: Answer[] = [];
  currentCorrectAnswer: Answer = null;

  questionNumber = 0;
  answeredNumber = 0;

  disableNextQuestionButton = true;
  disableAnswerButton = false;




  currentGameSub: Subscription = null;
  questionSub: Subscription = null;
  answersSub: Subscription = null;

  closeDiaSub: Subscription = null;

  runGame = false;
  endGame = false;
  loadGame = true;
  noGameExists = false;
  moreGamesExists = false;
  sentGame = false;




  constructor(private auth: AuthService, private router: Router, private userService: UserService, public dialog: MatDialog, private quizService: QuizService, private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });
    this.initGame();

  }


  initGame() {

    this.quizService.getGameByPlayer(this.loggedInUser).subscribe(game => {

      console.log('this.quizService.getGameByPlayer');
      console.log(game);

      if (game.length > 1) {
        this.moreGamesExists = true;
        this.loadGame = false;
        return;
      }
      else if (game.length == 0) {
        this.noGameExists = true;
        this.loadGame = false;
        return;
      }

      // Setze Quiz
      this.currentQuizId = game[0].idQuiz;

      // Setze Kurs und Kategorie
      this.currentSubject = game[0].subject;
      this.currentSubjectId = game[0].idSubject;
      this.currentCategory = game[0].category;
      this.currentCategoryId = game[0].idCategory;

      // Setze Spieler 1 und Spieler 2
      const idCreator = game[0].idCreatorUser;
      const idJoiner = game[0].idJoinerUser

      this.player1 = this.loggedInUser;
      const idForPlayer2 = this.loggedInUser.idUser == idCreator ? idJoiner : idCreator;

      this.userService.getUser(this.loggedInUser, idForPlayer2).subscribe(response => {
        this.player2 = response;


        console.log('inside  this.userService.getUse');
        console.log(response);

        // Initialisere alle Fragen, erst nachdem beide Teilnehmer geladen werden konnten.
        this.initQuestionsInGame();

      });


    });

  }

  initQuestionsInGame() {
    this.questionSub = this.quizService.getQuestions(this.loggedInUser, this.currentSubjectId, this.currentCategoryId).subscribe(response => {
      this.questions = response;

      // init first question
      this.nextQuestion();

      // Prüfe ob alle benötigten Daten vorhanden sind
      this.runGame = this.checkAllData();
      this.loadGame = !this.checkAllData();

    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  checkAllData() {
    return this.currentQuestion != null && this.currentAnswers != null && this.questions.length >= 10 && this.player1 != null && this.player2 != null;
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
    this.answeredNumber++;
  }



  nextQuestion() {
    if (this.questionNumber < 10) {
      this.currentQuestion = this.questions[this.questionNumber];
      this.questionNumber++;
      this.initAnswersForQuestion(this.currentQuestion.idQuestion);
    }
    this.disableAnswerButton = false;
    this.disableNextQuestionButton = true;
  }

  finishGame() {
    this.quizService.finishQuiz(this.loggedInUser, this.currentQuizId, this.currentPlayerPoints).subscribe(response => {
      this.sentGame = true;
      setTimeout(() => {
        this.router.navigate(['/ranking']);
      }, 1000)
    });
  }

  onFrageMelden() {
    this.currentQuestion["Flagged"] = 1;
    this.questionService.update(this.loggedInUser, this.currentQuestion).subscribe(response => {

      this.successMsg = true;
      setTimeout(() => {
        this.successMsg = false;
      }, 5000)
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  openDialog(isCorrect: boolean, answer: string) {
    this.dialog.open(DialogComponent, {
      data: {
        isCorrect: isCorrect,
        answer: answer,
      },
    });


    this.closeDiaSub = this.dialog.afterAllClosed.subscribe(response => {
      if (this.answeredNumber == 10) {
        this.runGame = false;
        this.endGame = true;
      }
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


}
