import { Component, inject, OnInit, output } from '@angular/core';
import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  ValidatorFn, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../_services/account.service';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DateInputComponent } from '../_forms/date-picker/date-picker.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, TextInputComponent, ReactiveFormsModule, NgIf, NgFor, DateInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private toastService = inject(ToastrService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  cancelRegister = output<boolean>();
  registerForm: FormGroup = new FormGroup({});
  maxDate = new Date();
  validationErrors: string[] | undefined = [];

  // constructor(private accountService:AccountService,,
  //   private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    // this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: _ => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value
        ? null : { isMatching: true }
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth: dob});
    this.accountService.register(this.registerForm?.value).subscribe(
      {
        next: _ => {
          this.router.navigateByUrl('/members');
          // this.cancel();
        },
        error: error => {
          // this.toastService.error(error.error)
          this.validationErrors = error;
        }
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }
}
