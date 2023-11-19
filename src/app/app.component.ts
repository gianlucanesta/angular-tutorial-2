import { CustomValidators } from './components/custom-validators';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectName: [
        null,
        {
          validators: [
            Validators.required,
            CustomValidators.invalidProjectName,
          ],
          asyncValidators: [CustomValidators.asyncInvalidProjectName],
          updateOn: 'blur', // Puoi impostare 'blur' o 'submit' a seconda dei tuoi requisiti
        },
      ],
      email: [null, [Validators.required, Validators.email]],
      projectStatus: ['critical'],
    });
  }

  onSaveProject() {
    console.log(this.projectForm.value);
  }
}
