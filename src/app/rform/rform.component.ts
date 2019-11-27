import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
  ValidationErrors,
  FormGroup
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit {
  form: FormGroup;
  validName = 'Default';
  counter = 0;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      on: ['', Validators.required],
      name: ['', [Validators.required], this.asyncNameValidator.bind(this)],
      items: new FormArray([])
    });
  }

  get items(): FormArray {
    return this.form.controls['items'] as FormArray;
  }

  addItem() {
    this.items.push(
      this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['default']
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  ngOnInit() {}

  get name(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  onSubmitHandler() {
    console.log('Form posted', this.form.value);
  }

  asyncNameValidator(
    control: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> {
    let val = control.value;
    this.counter++;

    if (this.validName === val) {
      return of(null); //  null for passing validation
    } else {
      return of({ async_error: true });
    }

    // promise implementation: should resolve in either case!

    // if (this.validName === val) {
    //   return Promise.resolve(null); //  null for passing validation
    // } else {
    //   return Promise.resolve({ async_error: true });
    // }
  }
}
