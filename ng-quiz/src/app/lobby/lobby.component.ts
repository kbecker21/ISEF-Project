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
  displayedColumns: string[] = ['idCreatorUser', 'idSubject', 'action'];

  loggedInUser: User = null;
  userSub: Subscription = null;

  courses = new FormControl();

  allCourses: Subscription = null;
  dataSourceCourses: Course[] = [];

  allOpenedGames: Subscription = null;
  dataSource: Quiz[] = [];

  createdQuiz: Subscription = null;

  constructor(private auth: AuthService, private userService: UserService, private lobbyService: LobbyService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();

    this.initCourses();
  }

  initTable() {
    this.allOpenedGames = this.lobbyService.getAllOpenedGames(this.loggedInUser).subscribe(response => {
      this.dataSource = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  initCourses() {
    this.allCourses = this.courseService.all(this.loggedInUser).subscribe(response => {
      const filteredResponse = response.filter(course => course.isActive === true);
      this.dataSourceCourses = filteredResponse;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  onJoinGame(element: User): void {
    // TODO: API anpassen für lobbyService.joinGame
    console.log(element);

    // wenn successfull dann initTable(); eigene Box aktualisieren
  }

  onCreateGame() {
    const selectedCourseId = this.courses.value;
    console.log(selectedCourseId);
    this.createdQuiz = this.lobbyService.createQuiz(this.loggedInUser, selectedCourseId).subscribe(response => {

      console.log(response);
      this.initTable();
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


}




