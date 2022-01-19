import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Category } from '../model/category.model';
import { AuthService } from './auth.service';
import { setAuthHeader, getUrl, getUrlById, handleError} from '../helpers';

const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private model = 'category';

  constructor(private http: HttpClient, private auth: AuthService) { }


  find(loggedInUser: User, courseID: number) {
    return this.http.get<any>(getUrl(this.model) + '/course/' + courseID, { headers: setAuthHeader(loggedInUser.token) }).pipe(
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
    return this.http.post(getUrl(this.model), category, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  update(loggedInUser: User, category) {
    return this.http.put(getUrlById(this.model, category.id), category, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

   /**
   * Löscht eine Kategorie.
   * @param loggedInUser eingeloggter User
   * @param categorieId Der Kurs der gelöscht werden soll.
   * @returns xxxxxxxxx
   */
    delete(loggedInUser: User, categorieId: number) {
            
      return this.http.delete<any>(getUrlById(this.model, categorieId), { headers: setAuthHeader(loggedInUser.token) }).pipe(
        catchError(handleError)
      );
    }

  
}
