import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../model/user.model';
import { getUrl } from '../helpers';

@Injectable({ providedIn: 'root' })

/**
 * Diese Komponente implementiert den Auth Service.
 */
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Registiert einen Benutzer.
   * @param firstname Vorname
   * @param lastname Nachname
   * @param email E-Mail
   * @param password Passwort
   * @returns xxxxxxxxxxx
   */
  signup(firstname: string, lastname: string, email: string, password: string) {
    return this.http
      .post<any>(
        getUrl('register'),
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Meldet einen Benutzer an.
   * @param email E-Mail
   * @param password Passwort
   * @returns xxxxxxxxx
   */
  login(email: string, password: string) {
    return this.http
      .post<any>(
        getUrl('login'),
        {
          email: email,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.token,
            +resData.Userdata.idUser,
            resData.Userdata.FirstName,
            resData.Userdata.LastName,
            resData.Userdata.Email,
            +resData.Userdata.AccountLevel_idAccountLevel
          );
        })
      );
  }

  /**
   * Aktualisiert den Login.
   * @returns xxxxxxxxxx
   */
  autoLogin() {
    const userData: {
      idUser: number,
      firstName: string,
      lastName: string,
      email: string,
      accountLevel: number,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.idUser,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.accountLevel,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  /**
 * Meldet den Benutzer ab.
 * Löscht gespeicherte Daten.
 * Navigiert auf Anmeldung.
 */
  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * Meldet den Benutzer ab, wenn die Zeit abgelaufen ist.
   * @param expirationDuration 
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /**
   * Speichert Login
   * @param token Token
   * @param idUser User ID
   * @param firstName Vorname
   * @param lastName Nachname
   * @param email E-Mail
   * @param accountLevel Account Level 
   */
  private handleAuthentication(
    token: string,
    idUser: number,
    firstName: string,
    lastName: string,
    email: string,
    accountLevel: number
  ) {
    const expiresIn = 3600;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(idUser, firstName, lastName, email, accountLevel, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * Behandelt Fehlermeldungen
   * @param errorRes Error
   * @returns xxxxxxx
   */
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error.error == 'Email exists.') {
      errorMessage = 'E-Mail exisitert bereits.'
    }
    if (errorRes.error.error == 'Invalid username or password.') {
      errorMessage = 'E-Mail und Passwort stimmen nicht überein.'
    }
    return throwError(errorMessage);
  }


}
