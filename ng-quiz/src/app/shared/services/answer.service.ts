import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Answer } from '../model/answer.model';
import { AuthService } from './auth.service';
import { setAuthHeader, getUrl, getUrlById, handleError} from '../helpers';

const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private model = 'answer';

  constructor(private http: HttpClient, private auth: AuthService) { }

 /**
   * erstellt eine Antwort.
   * @param loggedInUser eingeloggter User
   * @param answer Modell der Antwort welche erstellt werden soll.
   * @returns xxxxxxxxx
   */
  create(loggedInUser: User, answer: Answer) {
    return this.http.post(getUrl(this.model), answer, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  /**
   * aktualisiert eine Antwort.
   * @param loggedInUser eingeloggter User
   * @param answer Modell der Antwort welche aktualisiert werden soll.
   * @returns xxxxxxxxx
   */
  update(loggedInUser: User, answer: Answer) {
    return this.http.put(getUrlById(this.model, answer.idAnswers), answer, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }
 
  /**
   * Löscht eine Antwort.
   * @param loggedInUser eingeloggter User
   * @param answerId Die Antwort welche gelöscht werden soll.
   * @returns xxxxxxxxx
   */
  delete(loggedInUser: User, questionId: number) {
            
    return this.http.delete<any>(getUrlById(this.model, questionId), { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  /**
   * Prüft ob für die Frage bwreits eine Antwort als richtig deklariert ist.
   * @param loggedInUser eingeloggter User
   * @param answerId Die Antwort welche gelöscht werden soll.
   * @returns xxxxxxxxx
   */
  checkUniqueAnswer(loggedInUser: User, $questionID: number, $answerID: number) {
    return this.http.get<any>(URL + '/answerunique/' + $questionID + '/' + $answerID, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }
 

}
