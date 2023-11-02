import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/book/services/form-data.service';

@Component({
  selector: 'app-book-add-details',
  templateUrl: './book-add-details.component.html',
  styleUrls: ['./book-add-details.component.css'],
})
export class BookAddDetailsComponent implements OnInit {
  @Output() nextClickedFromDetails = new EventEmitter<void>();
  bookAddForm: FormGroup;
  isDetailsFormValid: boolean = false;

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.bookAddForm = new FormGroup({
      nazivKnjiga: new FormControl(null, [Validators.required]),
      kratki_sadrzaj: new FormControl(null, [Validators.required]),
      categories: new FormControl(null, Validators.required),
      genres: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      izdavac: new FormControl(null, Validators.required),
      godinaIzdavanja: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4),
      ]),
      knjigaKolicina: new FormControl(null, [
        Validators.required,
        this.greaterThanZero,
      ]),
      jezik: new FormControl(1),
      deletePdfs: new FormControl(0),
      //lang and deletePdfs variables were required in api, even though they weren't in the prototype form - therefore the static content (temporarily)
    });
    this.bookAddForm.valueChanges.subscribe(() => {
      this.isDetailsFormValid = this.bookAddForm.valid;
    });
    this.bookAddForm.patchValue(this.formDataService.getFormDataDetails());
  }

  onNextClick() {
    this.formDataService.setFormDataDetails(this.bookAddForm.value);
    this.nextClickedFromDetails.emit();
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
