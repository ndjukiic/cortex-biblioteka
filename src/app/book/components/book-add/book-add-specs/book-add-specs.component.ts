import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/book/services/form-data.service';
import { BookService } from 'src/app/book/services/book.service';

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
  dropdownSettings: IDropdownSettings = {};
  data;

  constructor(
    private formDataService: FormDataService,
    private bookService: BookService
  ) {}

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

    this.bookService.getAllBookProperties().subscribe((response) => {
      this.data = response;
    });
    this.bookAddForm.valueChanges.subscribe(() => {
      this.isSpecsFormValid = this.bookAddForm.valid;
    });
    this.bookAddForm.patchValue(this.formDataService.getFormDataSpecs());

    this.initDropdownSettings();
  }

  onNextClick() {
    console.log(this.bookAddForm.value);
    this.formDataService.setFormDataSpecs(this.bookAddForm.value);
    this.nextClickedFromSpecs.emit();
  }

  initDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Izaberi sve',
      unSelectAllText: 'Poništi izbor',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
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
