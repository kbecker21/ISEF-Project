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
 * @Vorgang BI-008
 */
export class AdminComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'accountLevel', 'actions'];

  loggedInUser: User = null;
  userSub: Subscription = null;
  allUsers: Subscription = null;

  closeDiaSub: Subscription = null;

  dataSource: Users[] = [];


  constructor(private auth: AuthService, private userService: UserService, public dialog: MatDialog) { }

  /**
   * Initialisiert den aktuellen Benutzer.
   * Initialisiert die Benutzerverwaltungs-Tabelle.
   * @Vorgang BI-008
   */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();
  }

  /**
   * Initialisiert die Tabelle
   * @Vorgang BI-008
   */
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
  * @Vorgang BI-008
  */
  openDialog(element: Users): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '350px',
      data: { accountLevel: element.accountLevel, userId: element.id },
    });

    // Sobald der Dialog geschlossen wurde, muss die Tabelle aktualisert werden.
    this.closeDiaSub = this.dialog.afterAllClosed.subscribe(response => {
      this.initTable();
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  /**
   * Löscht den Account.
   * @param id Account ID
   * @Vorgang BI-008
   */
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
    * @Vorgang BI-008
    */
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.allUsers.unsubscribe();
  }



}
