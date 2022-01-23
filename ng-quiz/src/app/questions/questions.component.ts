import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user.model';
import { QuestionList } from '../shared/model/questionlist.model';
import { QuestionsService } from '../shared/services/questions.service';
import { AnswerService } from '../shared/services/answer.service';
import { Question } from '../shared/model/question.model';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { AddAnswerDialogComponent } from './add-answer-dialog/add-answer-dialog.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { Category } from '../shared/model/category.model';
import { CategoryService } from '../shared/services/category.service';
import { filter } from 'rxjs/operators';
import { Answer } from '../shared/model/answer.model';
import { Course } from '../shared/model/course.model';
import { CourseService } from '../shared/services/course.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  userSub: Subscription = null;
  allQuestions: Subscription = null;
  loggedInUser: User = null;
  dataSource: QuestionList[] = [];
  allCourses: Subscription = null;
  courseList: Course[] = [];

  displayedCourseColumns: string[] = ['Name', 'ShortName'];

  courseID: number;
  editMode = false;
  panel = 0;

  courseName: string;
  courseShort: string;
  
  nav_position: string = 'start';

  private routeSub: Subscription;

  constructor(private auth: AuthService, private questionsService: QuestionsService, private answerService: AnswerService, private categoryService: CategoryService, private dialog: MatDialog, private courseService: CourseService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });    
    
    this.loadCourses()    
  }

  loadCourses() {
    this.allCourses = this.courseService.all(this.loggedInUser).subscribe(response => {
      this.courseList = response;  
      this.courseID = null;   
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  getbyCourse(Name: string, shortName: string,  courseId: number) {    
    this.allQuestions = this.questionsService.getByCourse(this.loggedInUser, courseId).subscribe(data => {
      if (data.status === 204) {
        this.courseName = Name;
        this.courseShort = shortName;
        this.courseID = courseId;
        this.dataSource = [];
      } else {
        this.courseName = Name;
        this.courseShort = shortName;
        this.courseID = courseId;
        this.dataSource = data;          
      }   
    });    
  }

  saveQuestion(question: Question) {
    if(question.idQuestion) {     
      this.questionsService.update(this.loggedInUser, question).subscribe(data => {
        
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);
      });
    } else {
      this.questionsService.create(this.loggedInUser, question).subscribe(data => {
        
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);       
      });
    }
    
  }

  saveAnswer(answer: Answer) {
    if(answer.idAnswers) {
     
      this.answerService.update(this.loggedInUser, answer).subscribe(data => {        
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);        
      });
    } else {      
      this.answerService.create(this.loggedInUser, answer).subscribe(data => {
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);
      });
    }
    
  }

  saveCourse(course) {
    if(course.id) {
      this.courseService.update(this.loggedInUser, course)
        .subscribe(result => {
          this.courseName = course.Name;
          this.courseShort = course.ShortName;
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);

          
        });
      
    } else  {
      this.courseService.create(this.loggedInUser, course)
        .subscribe(result => this.refreshCourses())     
        
    }
  }

  deleteCourse(id: number) {
    if (confirm('Möchtest du sicher den Kurs löschen?')) {
      this.courseService.delete(this.loggedInUser, id).subscribe(response => {
        this.refreshCourses();
      },
        errorMessage => {
          console.log(errorMessage);
        });
    }

  }


  deleteQuestion(question: Question) {
    if (confirm('Möchtest du die Frage wirklich löschen?')) {
      this.questionsService.delete(this.loggedInUser, question.idQuestion).subscribe(data => {
        console.log(data);
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);
     },
     errorMessage => {
        console.log(errorMessage);        
      });
    }
  }

  deleteAnswer(answer: Answer) {
    if (confirm('Möchtest du die Antwort wirklich löschen?')) {
      this.answerService.delete(this.loggedInUser, answer.idAnswers).subscribe(data => {
        console.log(data);
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);
     },
     errorMessage => {
        console.log(errorMessage);
      });
    }
  }

  saveCategory(category) {
    if(category.id) {
      this.categoryService.update(this.loggedInUser, category)
        .subscribe(result => this.getbyCourse(this.courseName, this.courseShort, this.courseID))
      
    } else  {
      this.categoryService.create(this.loggedInUser, category)
        .subscribe(result => this.getbyCourse(this.courseName, this.courseShort, this.courseID))
    }
  }

  deleteCategory(categoryID: number) {
    if (confirm('Möchtest du sicher die Kategorie löschen?')) {
      this.categoryService.delete(this.loggedInUser, categoryID).subscribe(response => {
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);        
      },
        errorMessage => {
          console.log(errorMessage);
        });
    }

  }

  toggleActivate(question: Question) {
    if (question.Approved == 1) {
      question.Approved = 0;      
    } else {
      question.Approved = 1;
    }
          
    this.questionsService.update(this.loggedInUser, question).subscribe(data => {
      console.log(question);
      this.getbyCourse(this.courseName, this.courseShort, this.courseID);
    });
  }

  toggleTruth(answer: Answer) {    
    if (answer.Truth == 1) {
      answer.Truth = 0;      
    } else {
      answer.Truth = 1;
    }          
    this.answerService.update(this.loggedInUser, answer).subscribe(data => {
      console.log(answer);
      this.getbyCourse(this.courseName, this.courseShort, this.courseID);
    });
  }

  newQuestion(categoryID) {
    console.log(categoryID);
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
  
    dialogConfig.data = {
      category_idcategory: categoryID,
  };
  
  const dialogRef = this.dialog.open(AddQuestionDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
      .pipe(filter(data => data))
      .subscribe(data => this.saveQuestion(data)
  );    
  }


  newAnswer(questionID) {
    console.log(questionID);
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
  
    dialogConfig.data = {
      Question_idQuestion : questionID,
  };
  
  const dialogRef = this.dialog.open(AddAnswerDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
      .pipe(filter(data => data))
      .subscribe(data => this.saveAnswer(data)
  );    
  }

  newCourse() {
   const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
  
    dialogConfig.data = {
      
    };
  
  const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
      .pipe(filter(data => data))
      .subscribe(data => this.saveCourse(data)
    );    
  }

  editCourse(courseID: number) {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
  
    dialogConfig.data = {
      Name : this.courseName,
      id : courseID,
      ShortName : this.courseShort
    };
  
  const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
      .pipe(filter(data => data))
      .subscribe(data => this.saveCourse(data)
    );    
  }

  newCategory(courseID) {
    console.log(courseID);
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
  
    dialogConfig.data = {
      Subject_idSubject: courseID,
  };  
  
  const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
    .pipe(filter(data => data))
    .subscribe(data => this.saveCategory(data)
  );    
  }

  editCategory(categoryID: number, Name: string ) {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
  
    dialogConfig.data = {
      id: categoryID,
      Name: Name,
      Subject_idSubject: this.courseID,
  };  
  
  const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
  
    dialogRef.afterClosed()
    .pipe(filter(data => data))
    .subscribe(data => this.saveCategory(data)
  );    
  }
 
  setPanelID(panelid: number) {
    this.panel = panelid;
  }

  refreshCourses() {        
    this.loadCourses();
  }

  

}

