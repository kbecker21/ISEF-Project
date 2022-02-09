import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Category } from '../model/category.model';
import { AuthService } from './auth.service';
import { setAuthHeader, getUrl, getUrlById, handleError } from '../helpers';

@Injectable({
  providedIn: 'root',
})

/**
 * Klasse zur Verwaltung der Kategorien
 *
 * @Vorgang: BI-015
 */
export class CategoryService {
  private model = 'category';

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * Gibt eine Kategorie zurück.
   * @param loggedInUser eingeloggter User
   * @param courseID Die ID des Kurses welcher zurückgegeben werden soll.
   * @Vorgang BI-015
   * @returns Category
   */
  find(loggedInUser: User, courseID: number) {
    return this.http
      .get<any>(getUrl(this.model) + '/course/' + courseID, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(
        map((responseData) => {
          if (!responseData || !responseData.Category) return [];

          const categoryArray: Category[] = [];
          console.log(responseData);
          responseData.Category.forEach((category) => {
            categoryArray.push({
              id: category.idcategory,
              Subject_idSubject: category.Subject_idSubject,
              Name: category.Name,
              Creator: category.Creator_idUser,
              CreateDate: category.CreateDate,
            });
          });
          console.log(categoryArray);
          return categoryArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  /**
   * Erstellt eine Kategorie.
   * @param loggedInUser eingeloggter User
   * @param category Die ID des Kurses welcher zurückgegeben werden soll.
   * @Vorgang BI-015
   * @returns Http 201 oder Http 400
   */
  create(loggedInUser: User, category) {
    console.log(category);
    return this.http
      .post(getUrl(this.model), category, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Aktualisiert eine Kategorie.
   * @param loggedInUser eingeloggter User
   * @param category Die ID des Kurses welcher aktualisiert werden soll.
   * @Vorgang BI-015
   * @returns Http 201 oder Http 400
   */
  update(loggedInUser: User, category) {
    return this.http
      .put(getUrlById(this.model, category.id), category, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Löscht eine Kategorie.
   * @param loggedInUser eingeloggter User
   * @param categorieId Die Kategorie welche gelöscht werden soll.
   * @Vorgang BI-015
   * @returns Http 201 oder Http 400
   */
  delete(loggedInUser: User, categorieId: number) {
    return this.http
      .delete<any>(getUrlById(this.model, categorieId), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }
}
