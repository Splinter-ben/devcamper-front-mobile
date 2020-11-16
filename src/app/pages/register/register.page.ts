import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginResponse } from 'src/app/services/authentication/authentication.interface';
import { LoginFormValues, REDIRECT_REASON } from '../home/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
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
    this.loginForm = this.formBuilder.group({
      email: new FormControl('john@gmail.com', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('123456', {
        validators: [Validators.required],
      }),
    });

    this.nextUrl = this.route.snapshot.queryParams.nexturl || '/';
    
    if (this.route.snapshot.queryParams.redirectReason) {
      this.errorMessage = this.getRedirectReason(
        this.route.snapshot.queryParams.redirectReason
      );
    }
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
