import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  isAdmin = true;

  constructor(private auth: AuthService, private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user;
    },
      errorMessage => {
        console.log(errorMessage);
      })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '350px',
      data: { firstName: this.user.firstName, lastName: this.user.lastName, email: this.user.email, accountLevel: this.user.accountLevel },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  onDeleteAccount() {
    let userId = 1;

    this.userService.deleteAccount(userId).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

}
