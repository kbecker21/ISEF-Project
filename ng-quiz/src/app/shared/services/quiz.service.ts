import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { getUrl, getUrlById, getUrlByIdId, handleError } from '../helpers';
import { Answer } from '../model/answer.model';
import { Question } from '../model/question.model';
import { Quiz } from '../model/quiz.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Diese Komponente implementiert den QuizService.
 */
export class QuizService {
  constructor(private http: HttpClient) { }

  /**
   * Ermittelt Fragen zum Modul und Kategorie.
   * @param loggedInUser eingeloggter Benutzer
   * @param idSubject ID des Moduls
   * @param idCategory ID der Kategorie
   * @returns Questions
   */
  getQuestions(loggedInUser: User, idSubject: number, idCategory: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(getUrlByIdId('getquestions', idSubject, idCategory), { headers: headers }).pipe(
      map(responseData => {
        if (!responseData || !responseData.questions)
          return [];
        const questionArray: Question[] = [];
        responseData.questions.forEach((question) => {
          questionArray.push({
            idQuestion: question.idQuestion,
            category_idcategory: idCategory,
            QuestionDescription: question.QuestionDescription,
            Approved: 1,
            CreateDate: "",
            Flagged: 0
          });
        });
        return questionArray;
      }),
      catchError(handleError)
    );
  }

  /**
   * Ermittelt die Antworten zu einer Frage.
   * @param loggedInUser eingeloggter Benutzer
   * @param idQuestion ID der Frage
   * @returns Antworten
   */
  getAnswers(loggedInUser: User, idQuestion: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.get<any>(getUrlById('showanswers', idQuestion), { headers: headers }).pipe(

      map(responseData => {

        if (!responseData || !responseData.Answers)
          return [];

        const answerArray: Answer[] = [];
        responseData.Answers.forEach((answer) => {
          answerArray.push({
            idAnswers: answer.idAnswers,
            Question_idQuestion: answer.Question_idQuestion,
            Description: answer.Description,
            Truth: answer.Truth
          });
        });
        return answerArray;



      }),
      catchError(handleError)
    );
  }


  /**
   * Ermittelt das Spiel für einen Spieler
   * @param loggedInUser eingeloggter Benutzer
   * @returns aktuelles Spiel
   */
  getGameByPlayer(loggedInUser: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.get<any>(getUrlById('getGameByPlayer', loggedInUser.idUser), { headers: headers }).pipe(

      map(responseData => {

        if (!responseData || !responseData.Quiz)
          return [];

        const gamesArray: Quiz[] = [];

        responseData.Quiz.forEach((quiz) => {
          if (!(quiz.FinishCreator == 1 && quiz.FinishJoiner == 1)) {
            gamesArray.push({
              idQuiz: quiz.idQuiz,
              idSubject: quiz.idSubject,
              playDate: quiz.PlayDate,
              idCreatorUser: quiz.Creator_idUser,
              idJoinerUser: quiz.Joiner_idUser1,
              firstNameCreator: quiz.FirstName,
              lastNameCreator: quiz.LastName,
              subject: quiz.SubjectName,
              idCategory: quiz.idcategory,
              category: quiz.CategoryName
            });
          }
        });

        return gamesArray;


      }),
      catchError(handleError)
    );
  }

  /**
   * Beendet ein Spiel.
   * @param loggedInUser eingeloggter Benutzer
   * @param idQuiz ID des Quiz
   * @param pts erreichte Punktzahl
   */
  finishQuiz(loggedInUser: User, idQuiz: number, pts: number,) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.post<any>(getUrl('postResult'), { User_idUser: loggedInUser.idUser, Quiz_idQuiz: idQuiz, Points: pts, Winner: null }, { headers: headers })
      .pipe(
        catchError(handleError)
      );
  }

  /**
   * Löscht ein Spiel.
   * @param loggedInUser eingeloggter Benutzer
   * @param idQuiz ID des Quiz
   */
  deleteGame(loggedInUser: User, idQuiz: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.delete<any>(getUrlById('quiz', idQuiz), { headers: headers })
      .pipe(
        catchError(handleError)
      );
  }


  /**
   * Ermittelt die Spielerhistorie
   * @param loggedInUser eingeloggter Benutzer
   * @returns Spielerhistorie
   */
  getPlayerHistory(loggedInUser: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(getUrl('getplayerhistory'), { headers: headers }).pipe(
      catchError(handleError)
    );
  }


}
