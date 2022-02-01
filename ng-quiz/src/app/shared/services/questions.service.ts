import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Question } from '../model/question.model';
import { AuthService } from './auth.service';
import { setAuthHeader, getUrl, getUrlById, handleError } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private model = 'question';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getByCourse(loggedInUser: User, courseID: number) {
    return this.http.get<any>(getUrlById('questionsbycourse', courseID), { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  /**
  * Löscht einen Kurs.
  * @param loggedInUser eingeloggter User
  * @param questionId Der Kurs der gelöscht werden soll.
  * @returns xxxxxxxxx
  */
  delete(loggedInUser: User, questionId: number) {

    return this.http.delete<any>(getUrlById(this.model, questionId), { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  create(loggedInUser: User, question: Question) {
    console.log(question);
    return this.http.post(getUrl(this.model), question, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  update(loggedInUser: User, question: Question) {
    return this.http.put(getUrlById(this.model, question.idQuestion), question, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

}
