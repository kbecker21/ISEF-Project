import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

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

  dataSource: [];
  displayedColumns: string[] = ['date', 'player1', 'result', 'player2'];

  constructor(private auth: AuthService, private userService: UserService, private router: Router, public dialog: MatDialog) { }


  /**
   * Initialisiert den aktuellen Benutzer.
   */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    },
      errorMessage => {
        console.log(errorMessage);
      })
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
