import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Quiz } from '../model/quiz.model';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllOpenedGames(loggedInUser: User) {
    // get all created Quizeswhere is still no second player
    // return from server: alles aus Quiz + created User data
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(URL + '/quiz', { headers: headers }).pipe(
      map(responseData => {

        if (!responseData || !responseData.Quiz)
          return [];

        const gamesArray: Quiz[] = [];

        responseData.Quiz.forEach((quiz) => {
          gamesArray.push({
            idQuiz: quiz.idQuiz,
            idSubject: quiz.Subject_idSubject,
            playDate: quiz.PlayDate,
            idCreatorUser: quiz.Creator_idUser,
            idJoinerUser: quiz.Joiner_idUser1,
            firstNameCreator: quiz.FirstName,
            lastNameCreator: quiz.LastName,
            subject: quiz.Name
          });
        });

        return gamesArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  createQuiz(loggedInUser: User, subjectId: number, categoryId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.post<any>(URL + '/quiz', { Subject_idSubject: subjectId, category_idcategory: categoryId }, { headers: headers })
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  joinQuiz(loggedInUser: User, idQuiz: number, idJoinerUser: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.patch<any>(URL + '/quiz' + '/' + idQuiz, { Joiner_idUser1: idJoinerUser }, { headers: headers })
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }



}
