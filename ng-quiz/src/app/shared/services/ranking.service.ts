import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { handleError } from '../helpers';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient, private auth: AuthService) { }


  getRanking(loggedInUser: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(URL + '/getRanking/', { headers: headers }).pipe(
      catchError(handleError)
    );
  }
}
