import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/book/services/form-data.service';

@Component({
  selector: 'app-book-add-specs',
  templateUrl: './book-add-specs.component.html',
  styleUrls: ['./book-add-specs.component.css'],
})
export class BookAddSpecsComponent implements OnInit {
  @Output() nextClickedFromSpecs = new EventEmitter<void>();
  @Output() previousClickedFromSpecs = new EventEmitter<void>();
  bookAddForm: FormGroup;
  isSpecsFormValid: boolean = false;

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.bookAddForm = new FormGroup({
      brStrana: new FormControl(null, Validators.required),
      pismo: new FormControl(null, Validators.required),
      povez: new FormControl(null, Validators.required),
      format: new FormControl(null, Validators.required),
      isbn: new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
      ]),
    });
    this.bookAddForm.valueChanges.subscribe(() => {
      this.isSpecsFormValid = this.bookAddForm.valid;
    });
      this.bookAddForm.patchValue(this.formDataService.getFormDataSpecs());
  }

  onNextClick() {
    this.formDataService.setFormDataSpecs(this.bookAddForm.value);
    this.nextClickedFromSpecs.emit();
  }

  onPreviousClick() {
    this.formDataService.setFormDataSpecs(this.bookAddForm.value);
    this.previousClickedFromSpecs.emit();
  }

  greaterThanZero(control: FormControl): {
    [validation: string]: boolean;
  } {
    const value = control.value;
    if (value < 0) {
      return { greaterThanZero: false };
    }
    return null;
  }
}
