import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

declare var CKEDITOR: any;

@Component({
  selector: 'app-book-add-details',
  templateUrl: './book-add-details.component.html',
  styleUrls: ['./book-add-details.component.css'],
})
export class BookAddDetailsComponent implements OnInit, AfterViewInit {
  @Output() formEmitter = new EventEmitter<Book>();
  bookAddForm: FormGroup;
  data;

  constructor(private bookService: BookService) {}

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
      console.log(this.data);
    });
  }

  ngAfterViewInit() {
    CKEDITOR.replace('content');
  }

  getDataFromCKEditor() {
    const editor = CKEDITOR.instances.content;
    if (!editor) {
      return;
    }
    const data = editor.getData();
    return data;
  }

  onSubmit() {
    const content = this.getDataFromCKEditor();
    this.bookAddForm.get('kratki_sadrzaj').setValue(content);
    this.storeToParent();
    this.bookAddForm.reset();
  }

  storeToParent() {
    this.formEmitter.emit(this.bookAddForm.value);
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
