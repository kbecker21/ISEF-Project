import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Quiz } from '../shared/model/quiz.model';
import { User } from '../shared/model/user.model';
import { Course } from '../shared/model/course.model';
import { AuthService } from '../shared/services/auth.service';
import { LobbyService } from '../shared/services/lobby.service';
import { UserService } from '../shared/services/user.service';
import { CourseService } from '../shared/services/course.service';
import { FormControl } from '@angular/forms';
import { Category } from '../shared/model/category.model';
import { CategoryService } from '../shared/services/category.service';
import { QuizService } from '../shared/services/quiz.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'subject', 'category', 'action'];

  successMsg = false;

  loggedInUser: User = null;

  selectedCourse: Course = null;
  selectedCategoryId: number = null;

  courses = new FormControl();
  categories = new FormControl();

  dataSourceCourses: Course[] = [];
  dataSourceCategories: Category[] = [];

  dataSource: Quiz[] = [];
  allQuizes: Quiz[] = [];

  currentUserGame: Quiz = null;

  currentUserSub: Subscription = null;
  openedGamesSub: Subscription = null;
  allCoursesSub: Subscription = null;
  joinedQuiz: Subscription = null;
  createdQuiz: Subscription = null;
  selectedCategorySub: Subscription = null;

  constructor(private auth: AuthService, private userService: UserService, private lobbyService: LobbyService, private courseService: CourseService, private quizService: QuizService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.currentUserSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();

    this.initCourses();
  }

  initCurrentUser() {
    this.quizService.getGameByPlayer(this.loggedInUser).subscribe(game => {
      this.currentUserGame = game[0];
    })
  }

  initTable() {
    this.openedGamesSub = this.lobbyService.getAllOpenedGames(this.loggedInUser).subscribe(response => {
      this.allQuizes = response;
      this.dataSource = response.filter(quiz => quiz.idJoinerUser === null);
      this.initCurrentUser();
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  initCourses() {
    this.allCoursesSub = this.courseService.all(this.loggedInUser).subscribe(response => {
      const filteredResponse = response.filter(course => course.isActive === true);
      this.dataSourceCourses = filteredResponse;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }




  onJoinGame(quiz: Quiz): void {
    this.joinedQuiz = this.lobbyService.joinQuiz(this.loggedInUser, quiz.idQuiz, this.loggedInUser.idUser).subscribe(response => {
      this.initTable();
    },
      errorMessage => {
        console.log(errorMessage);
      });

  }

  onSelectCourse(course: Course) {
    this.selectedCourse = course;
    this.initCategories();
  }

  initCategories() {
    this.selectedCategorySub = this.categoryService.find(this.loggedInUser, this.selectedCourse.id).subscribe(response => {
      this.dataSourceCategories = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  onCreateGame() {
    this.createdQuiz = this.lobbyService.createQuiz(this.loggedInUser, this.selectedCourse.id, this.selectedCategoryId).subscribe(response => {
      this.initTable();


      this.successMsg = true;
      setTimeout(() => {
        this.successMsg = false;
      }, 5000)


    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


}




