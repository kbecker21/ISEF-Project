import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { getUrlById, getUrlByIdId, handleError } from '../helpers';
import { Answer } from '../model/answer.model';
import { Question } from '../model/question.model';
import { Quiz } from '../model/quiz.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  getQuestions(loggedInUser: User, idSubject: number, idCategory: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });
    return this.http.get<any>(getUrlByIdId('getquestions', idSubject, idCategory), { headers: headers }).pipe(
      map(responseData => {
        if (!responseData || !responseData.questions)
          return [];
        const questionArray: Question[] = [];
        responseData.questions.forEach((question) => {
          questionArray.push({
            idQuestion: question.idQuestion,
            category_idcategory: idCategory,
            QuestionDescription: question.QuestionDescription,
            Approved: 1,
            CreateDate: "",
            Flagged: 0
          });
        });
        return questionArray;
      }),
      catchError(handleError)
    );
  }


  getAnswers(loggedInUser: User, idQuestion: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.get<any>(getUrlById('showanswers', idQuestion), { headers: headers }).pipe(

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
      catchError(handleError)
    );
  }



  getGameByPlayer(loggedInUser: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + loggedInUser.token
    });

    return this.http.get<any>(getUrlById('getGameByPlayer', loggedInUser.idUser), { headers: headers }).pipe(

      map(responseData => {

        if (!responseData || !responseData.Quiz)
          return [];

        const gamesArray: Quiz[] = [];

        responseData.Quiz.forEach((quiz) => {
          gamesArray.push({
            idQuiz: quiz.idQuiz,
            idSubject: quiz.idSubject,
            playDate: quiz.PlayDate,
            idCreatorUser: quiz.Creator_idUser,
            idJoinerUser: quiz.Joiner_idUser1,
            firstNameCreator: quiz.FirstName,
            lastNameCreator: quiz.LastName,
            subject: quiz.SubjectName,
            idCategory: quiz.idcategory,
            category: quiz.CategoryName
          });
        });

        return gamesArray;


      }),
      catchError(handleError)
    );
  }



}
