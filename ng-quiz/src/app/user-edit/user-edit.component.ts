import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';


//outsourcen
export interface DialogData {
  firstName: string;
  lastName: string;
  email: string;
  accountLevel: number;
  userId: number
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

/**
 * Diese Komponente implementiert das Benutzer Formular. 
 * @Vorgang BI-008
 */
export class UserEditComponent implements OnInit, OnDestroy {
  form: FormGroup;

  userSub: Subscription = null;
  loggedInUser: User;


  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private auth: AuthService, private userService: UserService
  ) { }


  /**
  * Initialisiert den aktuellen Benutzer.
  * Initialisiert das Formular.
  * @Vorgang BI-008
  */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });


    this.form = new FormGroup({
      'userData': new FormGroup({
        'accountlevel': new FormControl(this.data.accountLevel)
      })
    });
  }

  /**
   * Abrechen der Eingabe. Schließt den Dialog.
   * @Vorgang BI-008
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Sendet Daten an Service.
   * @Vorgang BI-008
   */
  onSubmit(): void {

    let formAccountLevel = this.form.value.userData.accountlevel;
    let newAccountLevel = formAccountLevel != null ? formAccountLevel : this.data.accountLevel;

    this.userService.getUser(this.loggedInUser, this.data.userId).subscribe(updatedUser => {
      this.userService.updateUser(this.loggedInUser, updatedUser, newAccountLevel).subscribe(response => {
        this.dialogRef.close();
      });
    });



  }

  /**
  * Beendet alle Subscriptions.
  * @Vorgang BI-008
  */
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
