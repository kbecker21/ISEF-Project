import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

/**
 * Diese Komponente implementiert Registrierung und Anmeldung.
 * @Vorgang BI-002, BI-003
 */
export class AuthComponent implements OnInit {

  isLoginMode = false;
  form: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  error: string = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  /**
  * Initialisiert das Formular.
  * @Vorgang BI-002, BI-003
  */
  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.isLoginMode = data['isLoginMode'];
      }
    );

    this.form = new FormGroup({
      'userData': new FormGroup({
        'firstname': new FormControl(null),
        'lastname': new FormControl(null),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@iubh-fernstudium.de$")]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    });
  }

  /**
   * Sendet Formulardaten an den AuthService. 
   * @Vorgang BI-002, BI-003
   */
  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.userData.email;
    const password = this.form.value.userData.password;
    const firstname = this.form.value.userData.firstname;
    const lastname = this.form.value.userData.lastname;

    let authObs: Observable<any>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(firstname, lastname, email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoginMode = true;
        this.router.navigate(['/account']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    this.form.reset();

  }
}
