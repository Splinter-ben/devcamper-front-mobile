import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from 'src/app/services/authentication/authentication.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginFormValues, REDIRECT_REASON } from './login.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;
  title: string = 'DevCamper';
  errorMessage: string | boolean = null;
  errorConfirmPassword = `Passwords don't match`;

  private nextUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('john@gmail.com', {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('123456', {
          validators: [Validators.required],
        }),
        confirmPassword: new FormControl('123456', {
          validators: [Validators.required],
        }),
      },
      { validator: this.mustMatch }
    );

    this.nextUrl = this.route.snapshot.queryParams.nexturl || '/profile';

    if (this.route.snapshot.queryParams.redirectReason) {
      this.errorMessage = this.getRedirectReason(
        this.route.snapshot.queryParams.redirectReason
      );
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  
  /**
   * Check if the passwords match
   * @param loginForm
   */
  mustMatch(loginForm: FormGroup) {
    let password = loginForm.get('password').value;
    let confirmPassword = loginForm.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true };
  }

  /**
   * Hide/Show the password
   */
  hideShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(values: LoginFormValues) {
    this.authService
      .login(values.email, values.password)
      .subscribe((result: LoginResponse) => {
        // if login ok, navigate to the home page
        if (result.ok) {
          this.router.navigate([this.nextUrl]);
        } else {
          console.log(`something went wrong during the login !`);
        }
      });
  }

  private getRedirectReason(redirectReason: REDIRECT_REASON) {
    switch (redirectReason) {
      case REDIRECT_REASON.SESSION_EXPIRED:
        return `The session has expired. `;

      case REDIRECT_REASON.LOGIN_REQUIRED:
        return `You need to be connected to access to this page `;

      default:
        return `Please loged back`;
    }
  }
}
