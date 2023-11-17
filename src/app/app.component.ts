import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm!: FormGroup;

  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        userData: new FormGroup({
          username: new FormControl(null, [
            Validators.required,
            this.forbiddenNames.bind(this),
          ]),
          email: new FormControl(null, [Validators.required, Validators.email]),
        }),
        gender: new FormControl('male'),
        hobbies: new FormArray([]),
      },
      { asyncValidators: this.forbiddenEmails() }
    );
  }

  get hobbiesControls(): AbstractControl[] {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  getHobbyFormControl(index: number): FormControl {
    return (this.signupForm.get('hobbies') as FormArray).at(
      index
    ) as FormControl;
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.forbiddenEmailsAsyncValidator()(control).subscribe((result) => {
      if (result) {
        control.setErrors({ emailIsForbidden: true });
      } else {
        control.setErrors(null);
      }
    });
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.forbiddenEmailsAsyncValidator()(control as FormControl);
    };
  }

  forbiddenEmailsAsyncValidator(): (control: FormControl) => Observable<any> {
    return (control: FormControl): Observable<any> => {
      return of(
        control.value === 'test@test.com' ? { emailIsForbidden: true } : null
      );
    };
  }
}
