import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { getUrl, getUrlById, handleError } from '../helpers';
import { Quiz } from '../model/quiz.model';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Diese Komponente implementiert den LobbyService. 
 * Der Service stellt alle nötigen HTTP-Funktionen zum Abrufen, Erstellen und Hinzufügen von Benutzern eines Spiels bereit.
 */
export class LobbyService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * Ermittelt alle aktuell geöffneten Spiele
   * @param loggedInUser aktuell eingeloggter Benutzer
   * @returns alle offene Spiele
   */
  getAllOpenedGames(loggedInUser: User) {
    // get all created Quizeswhere is still no second player
    // return from server: alles aus Quiz + created User data
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(getUrl('quiz'), { headers: headers }).pipe(
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
            subject: quiz.SubjectName,
            idCategory: quiz.idcategory,
            category: quiz.CategoryName
          });
        });

        return gamesArray;
      }),
      catchError(handleError)
    );
  }

  /**
   * Erstellt ein neues Quiz für ein Benutzer, ein Modul und eine Kategorie
   * @param loggedInUser eingeloggter Benutzer
   * @param subjectId  ID des Moduls
   * @param categoryId  ID der Kategorie
   * @returns Quiz wurde erstellt
   */
  createQuiz(loggedInUser: User, subjectId: number, categoryId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.post<any>(getUrl('quiz'), { Subject_idSubject: subjectId, category_idcategory: categoryId }, { headers: headers })
      .pipe(
        catchError(handleError)
      );
  }

  /**
   * Fügt einen Benutzer einem Spiel hinzu.
   * @param loggedInUser eingeloggter Benutzer
   * @param idQuiz ID des Quiz
   * @param idJoinerUser ID des hinzugefügten Benutzer
   * @returns Benutzer wurde hinzugefügt
   */
  joinQuiz(loggedInUser: User, idQuiz: number, idJoinerUser: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.patch<any>(getUrlById('quiz', idQuiz), { Joiner_idUser1: idJoinerUser }, { headers: headers })
      .pipe(
        catchError(handleError)
      );
  }



}
