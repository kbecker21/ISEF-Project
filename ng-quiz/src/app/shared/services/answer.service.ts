import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Answer } from '../model/answer.model';
import { AuthService } from './auth.service';
import {
  setAuthHeader,
  getUrl,
  getUrlById,
  handleError,
  getUrlByIdId,
} from '../helpers';

@Injectable({
  providedIn: 'root',
})

/**
 * Klasse zur Verwaltung der Antworten
 *
 * @Vorgang BI-016, BI-017, BI-018
 */
export class AnswerService {
  private model = 'answer';

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * erstellt eine Antwort.
   * @param loggedInUser eingeloggter User
   * @param answer Modell der Antwort welche erstellt werden soll.
   * @Vorgang BI-016, BI-017
   * @returns Http 201 oder Http 400
   */
  create(loggedInUser: User, answer: Answer) {
    return this.http
      .post(getUrl(this.model), answer, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * aktualisiert eine Antwort.
   * @param loggedInUser eingeloggter User
   * @param answer Modell der Antwort welche aktualisiert werden soll.
   * @Vorgang BI-016, BI-017
   * @returns Http 201 oder Http 400
   */
  update(loggedInUser: User, answer: Answer) {
    return this.http
      .put(getUrlById(this.model, answer.idAnswers), answer, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Löscht eine Antwort.
   * @param loggedInUser eingeloggter User
   * @param answerId Die Antwort welche gelöscht werden soll.
   * @Vorgang BI-016, BI-017
   * @returns Http 201 oder Http 400
   */
  delete(loggedInUser: User, answerId: number) {
    return this.http
      .delete<any>(getUrlById(this.model, answerId), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Prüft ob für die Frage breits eine Antwort als richtig deklariert ist.
   * @param loggedInUser eingeloggter User
   * @param questionId Die zur Antwort gehörende Frage.
   * @param answerId Die Antwort welche gelöscht werden soll.
   * @Vorgang BI-016, BI-017
   * @returns true or false
   */
  checkUniqueAnswer(loggedInUser: User, questionID: number, answerID: number) {
    return this.http
      .get<any>(getUrlByIdId('answerunique', questionID, answerID), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }
}
