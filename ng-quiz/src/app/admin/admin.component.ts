import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { Users } from '../shared/model/users.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 *  Diese Komponente implementiert die Benutzerverwaltung.
 */
export class AdminComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'accountLevel', 'actions'];

  loggedInUser: User = null;
  userSub: Subscription = null;
  allUsers: Subscription = null;

  dataSource: Users[] = [];


  constructor(private auth: AuthService, private userService: UserService, public dialog: MatDialog) { }

  /**
   * Initialisiert den aktuellen Benutzer.
   * Initialisiert die Benutzerverwaltungs-Tabelle.
   */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();
  }

  initTable() {
    this.allUsers = this.userService.getUsers(this.loggedInUser).subscribe(response => {
      this.dataSource = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


  /**
  * Öffnet ein Dialogfenster mit den aktuellen Nutzerdaten.
  */
  openDialog(element: Users): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '350px',
      data: { accountLevel: element.accountLevel, userId: element.id },
    });
  }

  onDelete(id: number) {
    if (confirm('Möchtest du sicher den Account löschen?')) {
      this.userService.deleteUser(this.loggedInUser, id).subscribe(response => {
        this.initTable();
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
    this.allUsers.unsubscribe();
  }



}
