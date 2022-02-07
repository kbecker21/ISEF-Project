import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Question } from '../model/question.model';
import { AuthService } from './auth.service';
import { setAuthHeader, getUrl, getUrlById, handleError } from '../helpers';

@Injectable({
  providedIn: 'root',
})

/**
 * Service Klasse zur Verwaltung der Fragen und Antworten
 *
 * @Vorgang: BI-016, BI-017, BI-018 
 */
export class QuestionsService {
  private model = 'question';

  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Gibt alle Fragen und Antworten zu einem Kurs zurück.
   * @param loggedInUser eingeloggter User
   * @param courseID Die ID des Kurses für welchen alle Fragen und Antworten zurückgegeben werden sollen.
   * @Vorgang BI-016 
   * @returns QuestionList
   */
  getByCourse(loggedInUser: User, courseID: number) {
    console.log('all questions of course ' + courseID);
    return this.http
      .get<any>(getUrlById('questionsbycourse', courseID), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Gibt markierte Fragen und Antworten zu einem Kurs zurück.
   * @param loggedInUser eingeloggter User
   * @param courseID Die ID des Kurses für welchen die markierten Fragen und Antworten zurückgegeben werden sollen.
   * @Vorgang BI-018 
   * @returns QuestionList
   */
  getByCourseFlagged(loggedInUser: User, courseID: number) {
    console.log('all flagged questions of course ' + courseID);
    return this.http
      .get<any>(getUrlById('flaggedquestionsbycourse', courseID), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Gibt anzahl markierter Fragen zurück.
   * @param loggedInUser eingeloggter User
   * @param courseID Die ID des Kurses für welchen die markierten Fragen gezählt werdne sollen.
   * @Vorgang BI-018 
   * @returns integer
   */
  countFlagged(loggedInUser: User, courseID: number) {
    return this.http
      .get<any>(getUrlById('countflagged', courseID), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Löscht eine Frage.
   * @param loggedInUser eingeloggter User
   * @param questionId Die ID der Frage welche gelöscht werden soll.
   * @Vorgang BI-016 
   * @returns HTTP 201 oder HTTP 500
   */
  delete(loggedInUser: User, questionId: number) {
    return this.http
      .delete<any>(getUrlById(this.model, questionId), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Erstellt eine Frage.
   * @param loggedInUser eingeloggter User
   * @param question Die Frage welche erstellt werden soll.
   * @Vorgang BI-016 
   * @returns HTTP 201 oder HTTP 500
   */
  create(loggedInUser: User, question: Question) {
    console.log(question);
    return this.http
      .post(getUrl(this.model), question, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Aktualisiert eine Frage.
   * @param loggedInUser eingeloggter User
   * @param question Die Frage und Daten welche aktualisiert werden sollen.
   * @Vorgang BI-016 
   * @returns HTTP 201 oder HTTP 500
   */
  update(loggedInUser: User, question: Question) {
    console.log(question);
    return this.http
      .put(getUrlById(this.model, question.idQuestion), question, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }
}
