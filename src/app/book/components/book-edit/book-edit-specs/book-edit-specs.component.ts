import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit-specs',
  templateUrl: './book-edit-specs.component.html',
})
export class BookEditSpecsComponent implements OnInit {
  @Output() formEmitter = new EventEmitter<Book>();
  id: number;
  bookEditForm: FormGroup;
  isLoaded: boolean = false;
  data;
  existingBook: Book;
  dropdownSettings: IDropdownSettings = {};

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initEditForm();

    this.bookService.getAllBookProperties().subscribe((response) => {
      this.data = response;
    });

    this.id = this.bookService.getBookID();
    this.bookService.loadBook(this.id).subscribe((response) => {
      this.existingBook = response;
      this.patchEditForm();
    });

    this.initDropdownSettings();
  }

  initEditForm() {
    this.bookEditForm = new FormGroup({
      brStrana: new FormControl(null, Validators.required),
      pismo: new FormControl(null, Validators.required),
      povez: new FormControl(null, Validators.required),
      format: new FormControl(null, Validators.required),
      isbn: new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
      ]),
    });
  }

  patchEditForm() {
    this.bookEditForm.patchValue({
      brStrana: this.existingBook.pages,
      pismo: this.existingBook.script,
      povez: this.existingBook.bookbind,
      format: this.existingBook.format,
      isbn: this.existingBook.isbn,
    });
    this.isLoaded = true;
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

  onSubmit() {
    this.formatContent();
    this.storeToParent();
  }

  formatContent() {
    let scriptID;
    let bookbindID;
    let formatID;

    this.bookEditForm.get('pismo').value.map((script) => {
      scriptID = script.id;
    });
    this.bookEditForm.get('povez').value.map((bookbind) => {
      bookbindID = bookbind.id;
    });
    this.bookEditForm.get('format').value.map((format) => {
      formatID = format.id;
    });

    this.bookEditForm.get('pismo').setValue(scriptID);
    this.bookEditForm.get('povez').setValue(bookbindID);
    this.bookEditForm.get('format').setValue(formatID);
  }

  storeToParent() {
    this.formEmitter.emit(this.bookEditForm.value);
  }
}
