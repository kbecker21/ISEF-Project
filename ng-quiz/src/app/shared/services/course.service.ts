import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Course } from '../model/course.model';
import { AuthService } from './auth.service';
import { setAuthHeader, getUrl, getUrlById, handleError } from '../helpers';

@Injectable({
  providedIn: 'root',
})
/**
 * Klasse zur Verwaltung der Kurse
 *
 * @Vorgang: BI-016
 */
export class CourseService {
  private model = 'subject';

  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Gibt alle Kurse/Module zurück.
   * @param loggedInUser eingeloggter User
   * @Vorgang BI-015
   * @returns Course
   */
  all(loggedInUser: User) {
    // Wenn der eingeloggte User keine Adminrechte hat, wird eine andere Schnittstelle angesprochen.
    let usedController =
      loggedInUser.accountLevel === 5 ? 'subject' : 'Students';

    return this.http
      .get<any>(getUrl(usedController), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(
        map((responseData) => {
          if (!responseData || !responseData.Subject) return [];
          const courseArray: Course[] = [];
          responseData.Subject.forEach((subject) => {
            courseArray.push({
              id: subject.idSubject,
              Name: subject.Name,
              Creator: subject.Creator_idUser,
              CreateDate: subject.CreateDate,
              ShortName: subject.ShortName,
              isActive: subject.Active === '1' ? true : false,
            });
          });
          return courseArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  /**
   * Löscht einen Kurs.
   * @param loggedInUser eingeloggter User
   * @param courseId Der Kurs der gelöscht werden soll.
   * @Vorgang BI-015
   * @returns Http 201 oder Http 400
   */
  delete(loggedInUser: User, courseId: number) {
    return this.http
      .delete<any>(getUrlById(this.model, courseId), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Zeigt einen Kurs an.
   * @param loggedInUser eingeloggter User
   * @param courseId Der Kurs der angezeigt werden soll.
   * @Vorgang BI-015
   * @returns Course
   */
  find(loggedInUser: User, courseID: number) {
    return this.http
      .get<any>(getUrlById(this.model, courseID), {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * erstellt einen Kurs.
   * @param loggedInUser eingeloggter User
   * @param course Der Kurs der erstellt werden soll.
   * @Vorgang BI-015
   * @returns Http 201 oder Http 400
   */
  create(loggedInUser: User, course) {
    console.log(course);
    return this.http
      .post(getUrl(this.model), course, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }

  /**
   * Aktualisiert einen Kurs.
   * @param loggedInUser eingeloggter User
   * @param courseId Der Kurs der aktualisiert werden soll.
   * @Vorgang BI-015
   * @returns Http 201 oder Http 400
   */
  update(loggedInUser: User, course) {
    return this.http
      .put(getUrlById(this.model, course.id), course, {
        headers: setAuthHeader(loggedInUser.token),
      })
      .pipe(catchError(handleError));
  }
}
