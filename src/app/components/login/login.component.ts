import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  myForm!: FormGroup;
  isSubmitted: boolean = false;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.myForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
    });
  }

  onSubmitForm(): void {
    this.isSubmitted = true;
    if (this.myForm.valid) {
      localStorage.setItem('login', this.myForm.value);
      this.router.navigateByUrl('/main');
    }
  }

  getValidationMessage(control: string): string {
    const error = this.myForm.controls[control].errors;
    if (error?.['required']) {
      return 'Input is required';
    }
    if (error?.['minlength'] || error?.['maxlength']) {
      return 'Input must be between 5 and 15 characters long';
    }
    return '';
  }

  get login(): AbstractControl {
    return this.myForm.get('login') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.myForm.get('password') as AbstractControl;
  }
}
