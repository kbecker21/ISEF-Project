import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/model/question.model';
import { Answer } from '../shared/model/answer.model';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../shared/services/quiz.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/model/user.model';
import { Subscription } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { QuestionsService } from '../shared/services/questions.service';

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

  disableNextQuestionButton = true;
  disableAnswerButton = false;
  displayEndGameButton = false;


  currentGameSub: Subscription = null;
  questionSub: Subscription = null;
  answersSub: Subscription = null;

  showGame = false;


  constructor(private auth: AuthService, private userService: UserService, public dialog: MatDialog, private quizService: QuizService, private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });
    this.initGame();

  }


  initGame() {

    this.quizService.getGameByPlayer(this.loggedInUser).subscribe(game => {

      if (game.length > 1) {
        this.showGame = false;
      }

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
      });

      // Initialisere die erste Frage
      this.initQuestionsInGame();
    });

  }

  initQuestionsInGame() {

    console.log(this.currentSubjectId);
    console.log(this.currentCategoryId);
    this.questionSub = this.quizService.getQuestions(this.loggedInUser, this.currentSubjectId, this.currentCategoryId).subscribe(response => {
      this.questions = response;

      // init first question
      this.nextQuestion();

      // Prüfe ob alle benötigten Daten vorhanden sind
      this.showGame = this.checkAllData();
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  checkAllData() {
    return this.currentQuestion != null && this.currentAnswers != null && this.questions.length >= 10;
  }


  initAnswersForQuestion(idQuestion: number) {
    this.answersSub = this.quizService.getAnswers(this.loggedInUser, idQuestion).subscribe(response => {
      this.currentCorrectAnswer = response.find(answer => answer.Truth == 1);
      this.currentAnswers = response;

      console.log('currentAnswers');
      console.log(this.currentAnswers);

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
    console.log('questionNumber:' + this.questionNumber);
    if (this.questionNumber < 10) {
      this.currentQuestion = this.questions[this.questionNumber];
      this.questionNumber++;
      this.initAnswersForQuestion(this.currentQuestion.idQuestion);
    }
    if (this.questionNumber == 10) {
      this.currentQuestion = this.questions[this.questionNumber];
      this.initAnswersForQuestion(this.currentQuestion.idQuestion);
    }
    if (this.questionNumber > 10) {
      this.displayEndGameButton = true;
    }
    this.disableAnswerButton = false;
  }

  finishGame() {
    // TODO: send result;
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
  }


}
