import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Course } from '../model/course.model';
import { AuthService } from './auth.service';
import { setAuthHeader, getUrl, getUrlById, handleError } from '../helpers';

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
    let usedController = loggedInUser.accountLevel === 5 ? 'subject' : 'Students'

    return this.http.get<any>(URL + '/' + usedController, { headers: setAuthHeader(loggedInUser.token) }).pipe(
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

    return this.http.delete<any>(getUrlById(this.model, courseId), { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  find(loggedInUser: User, courseID: number) {
    return this.http.get<any>(getUrlById(this.model, courseID), { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }


  create(loggedInUser: User, course) {
    console.log(course);
    return this.http.post(getUrl(this.model), course, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }

  update(loggedInUser: User, course) {
    return this.http.put(getUrlById(this.model, course.id), course, { headers: setAuthHeader(loggedInUser.token) }).pipe(
      catchError(handleError)
    );
  }



}

