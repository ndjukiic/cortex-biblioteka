import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/book/services/book.service';
import { FormDataService } from 'src/app/book/services/form-data.service';

declare var CKEDITOR: any;

@Component({
  selector: 'app-book-add-details',
  templateUrl: './book-add-details.component.html',
  styleUrls: ['./book-add-details.component.css'],
})
export class BookAddDetailsComponent implements OnInit, AfterViewInit {
  @Output() nextClickedFromDetails = new EventEmitter<void>();
  bookAddForm: FormGroup;
  isDetailsFormValid: boolean = false;
  data;

  constructor(private formDataService: FormDataService, private bookService: BookService) {}

  ngOnInit() {
    this.bookAddForm = new FormGroup({
      nazivKnjiga: new FormControl(null, [Validators.required]),
      kratki_sadrzaj: new FormControl(null),
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
      //lang and deletePdfs variables were required in api
    });

    this.bookService.getAllBookProperties().subscribe((response) => {
      this.data = response;
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

  ngAfterViewInit() {
    CKEDITOR.replace('content');
    this.setCKEditorContent();
  
    CKEDITOR.instances.content.on('change', () => {
      const content = this.getDataFromCKEditor();
      this.bookAddForm.get('kratki_sadrzaj').setValue(content);
    });
  
    this.bookAddForm.patchValue(this.formDataService.getFormDataDetails());
  }

  setCKEditorContent() {
    const editor = CKEDITOR.instances.content;
    if (editor) {
      const content = this.formDataService.getFormDataDetails()?.kratki_sadrzaj;
      editor.setData(content);
    }
  }

  getDataFromCKEditor() {
    const editor = CKEDITOR.instances.content;
    if (!editor) {
      return;
    }
    const data = editor.getData();
    return data;
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
