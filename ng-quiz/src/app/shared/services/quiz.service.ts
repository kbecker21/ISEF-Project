import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Answer } from '../model/answer.model';
import { User } from '../model/user.model';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';
@Injectable({

  providedIn: 'root'
})
export class QuizService {



  constructor(private http: HttpClient) { }




  getQuestion(loggedInUser: User, idSubject: number, idCategory: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });


    return this.http.get<any>(URL + '/quiz/getquestions/' + idSubject + "/" + idCategory, { headers: headers }).pipe(

      map(responseData => {

        console.log(responseData);

        // if (!responseData || !responseData.Answers)
        //   return [];
        // const answerArray: Answer[] = [];
        // responseData.Answers.forEach((answer) => {
        //   answerArray.push({
        //     idAnswers: answer.idAnswers,
        //     Question_idQuestion: answer.Question_idQuestion,
        //     Description: answer.Description,
        //     Truth: answer.Truth
        //   });
        // });
        // return answerArray;



      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  getAnswers(loggedInUser: User, idQuestion: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });


    return this.http.get<any>(URL + '/answer/' + idQuestion, { headers: headers }).pipe(

      map(responseData => {

        if (!responseData || !responseData.Answers)
          return [];
        const answerArray: Answer[] = [];
        responseData.Answers.forEach((answer) => {
          answerArray.push({
            idAnswers: answer.idAnswers,
            Question_idQuestion: answer.Question_idQuestion,
            Description: answer.Description,
            Truth: answer.Truth
          });
        });
        return answerArray;



      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }
}
