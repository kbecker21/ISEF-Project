import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Category } from '../model/category.model';
import { AuthService } from './auth.service';

const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private model = 'category';

  constructor(private http: HttpClient, private auth: AuthService) { }


  find(loggedInUser: User, courseID: number) {
    return this.http.get<any>(this.getUrl() + '/course/' + courseID, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      map(responseData => {
        if (!responseData || !responseData.Category)
        
        return [];
        
        const categoryArray: Category[] = [];
        console.log(responseData);
        responseData.Category.forEach((category) => {
          categoryArray.push({
            id: category.idcategory,
            idSubject: category.Subject_idSubject,
            Name: category.Name,
            Creator: category.Creator_idUser,
            CreateDate: category.CreateDate                       
          });
        });
        console.log(categoryArray);
        return categoryArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  create(loggedInUser: User, category) {
    console.log(category);
    return this.http.post(this.getUrl(), category, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      catchError(this.handleError)
    );
  }

  update(loggedInUser: User, category) {
    return this.http.put(this.getUrlById(category.id), category, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      catchError(this.handleError)
    );
  }

   /**
   * Löscht eine Kategorie.
   * @param loggedInUser eingeloggter User
   * @param categorieId Der Kurs der gelöscht werden soll.
   * @returns xxxxxxxxx
   */
    delete(loggedInUser: User, categorieId: number) {
            
      return this.http.delete<any>(this.getUrlById(categorieId), { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
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
