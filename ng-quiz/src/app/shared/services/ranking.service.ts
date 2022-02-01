import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { getUrl, handleError } from '../helpers';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

/**
 * Diese Komponente implementiert den RankingService. 
 * Der Service stellt alle nötigen HTTP-Funktionen zum Abrufen des Rankings bereit.
 */
export class RankingService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * Ermittelt das Ranking
   * @param loggedInUser eingeloggter Benutzer
   * @returns Ranking
   */
  getRanking(loggedInUser: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(getUrl('getRanking'), { headers: headers }).pipe(
      catchError(handleError)
    );
  }
}
