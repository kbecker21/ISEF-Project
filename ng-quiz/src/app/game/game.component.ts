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

/**
 * Diese Komponente implementiert das Gameplay.
 * @Vorgang BI-006
 */
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
  errorExists = false;
  noSecondPlayer = false;

  constructor(private auth: AuthService, private router: Router, private userService: UserService, public dialog: MatDialog, private quizService: QuizService, private questionService: QuestionsService) { }

  /**
 * Initialisiert das Spiel f??r den aktuellen Benutzer.
 * @Vorgang BI-006
 */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });
    this.initGame();

  }

  /**
* Initialisiert das aktuelle Spiel.
@Vorgang BI-006
*/
  initGame() {
    this.quizService.getGameByPlayer(this.loggedInUser).subscribe(game => {

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

      if (idForPlayer2 == null) {
        this.noSecondPlayer = true;
        this.loadGame = false;
        return;
      }

      this.userService.getUser(this.loggedInUser, idForPlayer2).subscribe(response => {
        this.player2 = response;

        // Initialisere alle Fragen, erst nachdem beide Teilnehmer geladen werden konnten.
        this.initQuestionsInGame();

      });


    });

  }

  /**
   * Initialisiert die Fragen f??r das Spiel.
   * @Vorgang BI-006
   */
  initQuestionsInGame() {
    this.questionSub = this.quizService.getQuestions(this.loggedInUser, this.currentSubjectId, this.currentCategoryId).subscribe(response => {
      this.questions = response;

      if (response.length == 0) {
        this.errorExists = true;
        this.loadGame = false;
        return;
      }

      // init first question
      this.nextQuestion();

      // Pr??fe ob alle ben??tigten Daten vorhanden sind
      this.runGame = this.checkAllData();
      this.loadGame = !this.checkAllData();

    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  /**
   * Pr??ft ob alle Daten vorhanden sind.
   * @returns true: wenn alle Daten vorhanden sind; false: falls Daten fehlen
   * @Vorgang BI-006
   */
  checkAllData() {
    return this.currentQuestion != null && this.currentAnswers != null && this.questions.length >= 10 && this.player1 != null && this.player2 != null;
  }

  /**
   * Initialisiert die Antworten f??r eine Frage
   * @param idQuestion Frage ID
   * @Vorgang BI-006
   */
  initAnswersForQuestion(idQuestion: number) {
    this.answersSub = this.quizService.getAnswers(this.loggedInUser, idQuestion).subscribe(response => {
      this.currentCorrectAnswer = response.find(answer => answer.Truth == 1);
      this.currentAnswers = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  /**
   * Auswahl einer Antwort. ??ffnet den Dialog.
   * @param answer ausgew??hlte Antwort
   * @Vorgang BI-006
   */
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

  /**
   * L??dt die n??chste Frage.
   * @Vorgang BI-006
   */
  nextQuestion() {
    if (this.questionNumber < 10) {
      this.currentQuestion = this.questions[this.questionNumber];
      this.questionNumber++;
      this.initAnswersForQuestion(this.currentQuestion.idQuestion);
    }
    this.disableAnswerButton = false;
    this.disableNextQuestionButton = true;
  }

  /**
   * Beendet das Spiel.
   * @Vorgang BI-006
   */
  finishGame() {
    this.quizService.finishQuiz(this.loggedInUser, this.currentQuizId, this.currentPlayerPoints).subscribe(response => {
      this.sentGame = true;
      setTimeout(() => {
        this.router.navigate(['/ranking']);
      }, 1000)
    });
  }

  /**
   * Meldet die Frage an den Server.
   * @Vorgang BI-006
   */
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

  /**
   * ??ffnet den Dialog.
   * @param isCorrect Antwort war korrekt
   * @param answer Antwort Text
   * @Vorgang BI-006
   */
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
