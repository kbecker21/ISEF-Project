import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from '../shared/model/quiz.model';
import { User } from '../shared/model/user.model';
import { Course } from '../shared/model/course.model';
import { AuthService } from '../shared/services/auth.service';
import { LobbyService } from '../shared/services/lobby.service';
import { UserService } from '../shared/services/user.service';
import { CourseService } from '../shared/services/course.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'subject', 'action'];

  loggedInUser: User = null;

  courses = new FormControl();

  dataSourceCourses: Course[] = [];

  dataSource: Quiz[] = [];

  currentUserGame: Quiz = null;

  currentUserSub: Subscription = null;
  openedGamesSub: Subscription = null;
  allCoursesSub: Subscription = null;
  joinedQuiz: Subscription = null;
  createdQuiz: Subscription = null;

  constructor(private auth: AuthService, private userService: UserService, private lobbyService: LobbyService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.currentUserSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();

    this.initCourses();
  }

  initCurrentUser() {
    this.dataSource.forEach(quiz => {
      console.log(quiz);
      if (this.loggedInUser.idUser == quiz.idCreatorUser || this.loggedInUser.idUser == quiz.idJoinerUser) {
        this.currentUserGame = quiz;
      }
    });
  }

  initTable() {
    this.openedGamesSub = this.lobbyService.getAllOpenedGames(this.loggedInUser).subscribe(response => {
      this.dataSource = response;
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

  onCreateGame() {
    const selectedCourseId = this.courses.value;
    this.createdQuiz = this.lobbyService.createQuiz(this.loggedInUser, selectedCourseId).subscribe(response => {
      this.initTable();
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


}




