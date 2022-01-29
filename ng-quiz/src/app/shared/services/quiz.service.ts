import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Answer } from '../model/answer.model';
import { Question } from '../model/question.model';
import { User } from '../model/user.model';
import { LobbyService } from './lobby.service';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';
@Injectable({

  providedIn: 'root'
})
export class QuizService {



  constructor(private http: HttpClient) { }




  getQuestions(loggedInUser: User, idSubject: number, idCategory: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });


    return this.http.get<any>(URL + '/getquestions/' + idSubject + "/" + idCategory, { headers: headers }).pipe(
      map(responseData => {
        if (!responseData || !responseData.questions)
          return [];
        const questionArray: Question[] = [];
        responseData.questions.forEach((question) => {
          questionArray.push({
            idQuestion: question.idQuestion,
            category_idcategory: idCategory,
            QuestionDescription: question.QuestionDescription,
            Approved: 1,    // TODO: wird nicht benötigt
            CreateDate: "",  // TODO: wird nicht benötigt
            Flagged: 0       // TODO: wird nicht benötigt
          });
        });
        return questionArray;
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

    return this.http.get<any>(URL + '/showanswers/' + idQuestion, { headers: headers }).pipe(

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



  getGameByPlayer(loggedInUser: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.get<any>(URL + '/getGameByPlayer/' + loggedInUser.idUser, { headers: headers }).pipe(

      map(responseData => {

        if (!responseData)
          return [];

        return responseData



      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }



}
