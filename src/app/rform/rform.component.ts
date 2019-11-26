import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
  ValidationErrors
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

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      on: ['', Validators.required],
      name: ['', [Validators.required], this.asyncNameValidator.bind(this)],
      items: new FormArray([])
    });
  }

  get items(): FormArray {
    return this.form.controls['items'];
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
    return this.form.controls['name'];
  }

  onSubmitHandler() {
    console.log('Form posted', this.form.value);
  }

  asyncNameValidator(
    control: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> {
    let val = control.value;

    if (this.validName === val) {
      return of(null).pipe(delay(2000)); //  null for passing validation
    } else {
      return of({ async_error: true }).pipe(delay(2000));
    }

    // promise implementation: should resolve in either case!
    // if (this.validName === val) {
    //   return Promise.resolve(null);  //  null for passing validation
    // } else {
    //   return Promise.resolve({ async_error: true });
    // }
  }
}
