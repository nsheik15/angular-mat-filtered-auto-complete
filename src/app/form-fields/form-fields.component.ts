import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css']
})
export class FormFieldsComponent implements OnInit {

  //private isInvalidVar = true;
  options: string[] = ['Angular', 'React', 'Vue'];

  constructor(private fb: FormBuilder) { }

  formFields = this.fb.group(
    {
      address: this.fb.group(
        {
          state: [''],
          zipCode: ['']
        }
      ),
      facility: ['', [Validators.required]],
      provider: ['',  [Validators.required]],
      providerType: ['',  [Validators.required]],
      feeSchedule: ['']
    }
  );

  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.formFields.get('providerType').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  /*isInvalid() {
    if (this.formFields.invalid && this.formFields.touched)
      this.isInvalidVar = true;
    else
      this.isInvalidVar = false;

    return this.isInvalidVar;
  }*/

}
