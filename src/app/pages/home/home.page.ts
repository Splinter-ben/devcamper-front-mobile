import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = 'DevCamper';
  registerForm: FormGroup;
  submitted = false;
  errorConfirmPassword = `Passwords don't match`;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required]),
        // role: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.mustMatch }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Check if the passwords match
   * @param registerForm
   */
  mustMatch(registerForm: FormGroup) {
    let password = registerForm.get('password').value;
    let confirmPassword = registerForm.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    console.log('hello');
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }
}
