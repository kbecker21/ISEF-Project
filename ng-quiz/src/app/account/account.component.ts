import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { QuizService } from '../shared/services/quiz.service';
import { UserService } from '../shared/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';


interface PlayerHistory {
  OpponentFn: string,
  OpponentLn: string,
  PlayDate: Date,
  Points: number,
  Winner: number
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

/**
 * Diese Komponente implementiert die aktuelle Nutzeransicht.
 */
export class AccountComponent implements OnInit, OnDestroy {

  loggedInUser: User = null;
  userSub: Subscription = null;

  historySub: Subscription = null;

  dataSource: PlayerHistory[];
  displayedColumns: string[] = ['date', 'player1', 'player2', 'result'];

  constructor(private auth: AuthService, private userService: UserService, private router: Router, public dialog: MatDialog, private quizService: QuizService) { }


  /**
   * Initialisiert den aktuellen Benutzer.
   */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;

      this.initTable();
    },
      errorMessage => {
        console.log(errorMessage);
      })
  }

  initTable() {
    this.historySub = this.quizService.getPlayerHistory(this.loggedInUser).subscribe(response => {
      this.dataSource = response;
      console.log(response);
      // TODO: winner ist immer null: evtl erst getRanking in Rangliste anpassen da diese den Winner aktualisiert?
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  /**
   * Öffnet ein Dialogfenster mit den aktuellen Nutzerdaten.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '350px',
      data: { accountLevel: this.loggedInUser.accountLevel },
    });
  }


  /**
   * Nach der Bestätigung wird der Nutzer gelöscht, ausgeloggt und auf die Startseite navigiert.
   */
  onDeleteAccount() {
    if (confirm('Möchtest du sicher den Account löschen?')) {
      this.userService.deleteUser(this.loggedInUser, this.loggedInUser.idUser).subscribe(response => {
        console.log(response);
        this.auth.logout();
        this.router.navigate(['/home']);
      },
        errorMessage => {
          console.log(errorMessage);
        });
    }

  }

  /**
  * Beendet alle Subscriptions.
  */
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }




}
