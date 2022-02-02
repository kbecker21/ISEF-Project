import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { getUrl, getUrlById, handleError } from '../helpers';
import { User } from '../model/user.model';
import { Users } from '../model/users.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


/**
 * Diese Komponente implementiert den UserService. 
 * Der Service stellt alle nötigen HTTP-Funktionen zum Abrufen, Bearbeiten und Löschen von Benutzern bereit.
 */
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * Ermittelt einen Benutzer.
   * @param loggedInUser aktuell eingeloggter Benutzer
   * @param userId Benutzer ID
   * @returns Benutzer
   */
  getUser(loggedInUser: User, userId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(getUrlById('getuser', userId), { headers: headers }).pipe(
      catchError(handleError)
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
    let usedController = loggedInUser.accountLevel === 5 ? 'user' : 'getalluser'

    return this.http.get<any>(getUrl(usedController), { headers: headers }).pipe(

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
      catchError(handleError)
    );
  }

  /**
   * Aktualisiert einen Benutzer.
   * @param loggedInUser eingeloggter User
   * @param user Der Benutzer der aktualisiert werden soll.
   * @param usedController genutzer Controller
   * @returns xxxxxxxxx
   */
  updateUser(loggedInUser: User, user: User, newAccountLevel: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    // Attribut accountLevel heißt auf dem Server AccountLevel_idAccountLevel
    delete Object.assign(user, { ["AccountLevel_idAccountLevel"]: user["accountLevel"] })["accountLevel"];
    // set newAccountLevel
    user["AccountLevel_idAccountLevel"] = newAccountLevel;
    console.log(user);
    return this.http.put<any>(getUrlById('user', user.idUser), user, { headers: headers }
    ).pipe(
      catchError(handleError)
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

    return this.http.delete<any>(getUrlById(usedController, userId), { headers: headers }).pipe(
      catchError(handleError)
    );
  }

}