import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ValidatorFn, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private toastService = inject(ToastrService);
  cancelRegister = output<boolean>();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  // constructor(private accountService:AccountService,,
  //   private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
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
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      {
        next: response => {
          // this.router.navigateByUrl('/members');
          this.cancel();
        },
        error: error => {
          this.toastService.error(error.error)
          this.validationErrors = error;
        }
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
