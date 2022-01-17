import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Course } from '../model/course.model';
import { AuthService } from './auth.service';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private model = 'subject';

  constructor(private http: HttpClient, private auth: AuthService) { }

  all(loggedInUser: User) {

    // Wenn der eingeloggte User keine Adminrechte hat, wird eine andere Schnittstelle angesprochen. 
    let usedController = loggedInUser.accountLevel === 5 ? 'subject' : 'StudentsSubject'

    return this.http.get<any>(URL + '/' + usedController, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      map(responseData => {
        if (!responseData || !responseData.Subject)
          return [];

        const courseArray: Course[] = [];

        responseData.Subject.forEach((subject) => {
          courseArray.push({
            id: subject.idSubject,
            Name: subject.Name,
            Creator: subject.Creator_idUser,
            CreateDate: subject.CreateDate,
            ShortName: subject.ShortName,
            isActive: subject.Active === "1" ? true : false
          });
        });
        //console.log(courseArray);
        return courseArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  /**
  * Löscht einen Kurs.
  * @param loggedInUser eingeloggter User
  * @param courseId Der Kurs der gelöscht werden soll.
  * @returns xxxxxxxxx
  */
  delete(loggedInUser: User, courseId: number) {

    return this.http.delete<any>(this.getUrlById(courseId), { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      catchError(this.handleError)
    );
  }

  find(courseID) {

  }

  create(loggedInUser: User, course) {
    console.log(course);
    return this.http.post(this.getUrl(), course, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      catchError(this.handleError)
    );
  }

  update(loggedInUser: User, course) {
    return this.http.put(this.getUrlById(course.id), course, { headers: this.setAuthHeader(loggedInUser.token) }).pipe(
      catchError(this.handleError)
    );
  }


  private getUrl() {
    return `${URL}/${this.model}`;
  }

  private getUrlById(id) {
    return `${this.getUrl()}/${id}`
  }

  private setAuthHeader(token) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return headers;
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

