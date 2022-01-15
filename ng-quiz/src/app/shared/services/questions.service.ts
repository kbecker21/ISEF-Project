import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { QuestionList } from '../model/questionlist.model';
import { AuthService } from './auth.service';

const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private model = 'question';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getByCourse(loggedInUser: User, courseID: number) {
    return this.http.get<any>(URL + '/questionsbycourse/' + courseID, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      catchError(this.handleError)
    );
  }

   /**
   * Löscht einen Kurs.
   * @param loggedInUser eingeloggter User
   * @param questionId Der Kurs der gelöscht werden soll.
   * @returns xxxxxxxxx
   */
    delete(loggedInUser: User, questionId: number) {
            
      return this.http.delete<any>(this.getUrlById(questionId), { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
        catchError(this.handleError)
      );
    }

    create(loggedInUser: User, question) {
      console.log(question);
      return this.http.post(this.getUrl(), question, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
        catchError(this.handleError)
      );
    }
  
    update(loggedInUser: User, question) {
      return this.http.put(this.getUrlById(question.idQuestion), question, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
        catchError(this.handleError)
      );
    }


  private setAuthHeader(token) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return headers;
  }

  private getUrl() {
    return `${URL}/${this.model}`;
  }

  private getUrlById(id) {
    return `${this.getUrl()}/${id}`
  }

   /**
     * Behandelt Fehlermeldungen
     * @param errorRes Error
     * @returns xxxxxxxxx
     */
    private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'Foo':
          errorMessage = 'Foo';
          break;
      }
      return throwError(errorMessage);
    }

}
