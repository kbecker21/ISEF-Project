import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Users } from '../model/users.model';
import { AuthService } from './auth.service';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})


/**
 * Diese Komponente implementiert den UserService. 
 * Der Service stellt alle nötigen HTTP-Funktionen zum Abrufen, Bearbeiten und Löschen von Benutzern bereit.
 */
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  // TODO: erst fertigstellen bevor Kommentar.
  getUser(userId: number) {

    // Wenn der eingeloggte User keine Adminrechte hat, wird eine andere Schnittstelle angesprochen. 
    //let usedController = loggedInUser.accountLevel === 5 ? 'user' : 'me'

    return this.http.get<any>(URL + '/user/' + userId).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Ermittelt aller Nutzer im System.
   * @param token Der Token vom aktuellen Nutzer.
   * @returns alle Nutzer aus dem System
   */
  getUsers(loggedInUser: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    // Wenn der eingeloggte User keine Adminrechte hat, wird eine andere Schnittstelle angesprochen. 
    let usedController = loggedInUser.accountLevel === 5 ? 'user' : 'Students/getalluser'

    return this.http.get<any>(URL + '/' + usedController, { headers: headers }).pipe(

      map(responseData => {

        if (usedController === 'user') {
          if (!responseData || !responseData.User)
            return [];
          const usersArray: Users[] = [];
          responseData.User.forEach((user) => {
            usersArray.push({
              id: user.idUser,
              firstName: user.FirstName,
              lastName: user.LastName,
              email: user.Email,
              accountLevel: user.AccountLevel_idAccountLevel
            });
          });
          return usersArray;
        } else {
          if (!responseData || !responseData.user)
            return [];
          const usersArray: Users[] = [];
          responseData.user.forEach((user) => {
            usersArray.push({
              id: user.idUser,
              firstName: user.FirstName,
              lastName: user.LastName,
              email: user.Email,
              accountLevel: user.AccountLevel_idAccountLevel
            });
          });
          return usersArray;
        }


      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  /**
   * Aktualisiert einen Benutzer.
   * @param loggedInUser eingeloggter User
   * @param user Der Benutzer der aktualisiert werden soll.
   * @param usedController genutzer Controller
   * @returns xxxxxxxxx
   */
  updateUser(loggedInUser: User, user: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    // Wenn der eingeloggte User keine Adminrechte hat, wird eine andere Schnittstelle angesprochen. 
    let usedController = loggedInUser.accountLevel === 5 ? 'user' : 'me'

    return this.http.patch<any>(
      URL + '/' + usedController + '/' + user.idUser,
      {
        accountLevel: user.accountLevel
      }, { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * Löscht einen Benutzer.
   * @param loggedInUser eingeloggter User
   * @param userId Der Benutzer der gelöscht werden soll.
   * @returns xxxxxxxxx
   */
  deleteUser(loggedInUser: User, userId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    // Wenn der eingeloggte User keine Adminrechte hat, wird eine andere Schnittstelle angesprochen. 
    let usedController = loggedInUser.accountLevel === 5 ? 'user' : 'me'

    return this.http.delete<any>(URL + '/' + usedController + '/' + userId, { headers: headers }).pipe(
      catchError(this.handleError)
    );
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
