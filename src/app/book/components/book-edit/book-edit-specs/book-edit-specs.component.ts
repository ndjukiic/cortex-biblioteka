import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit-specs',
  templateUrl: './book-edit-specs.component.html',
})
export class BookEditSpecsComponent implements OnInit {
  @Output() formEmitter = new EventEmitter<Book>();
  bookToEdit: Book;
  id: number;
  bookEditForm: FormGroup;
  isLoaded: boolean = false;

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initEditForm();

    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
      this.patchEditForm();
    });
  }

  initEditForm() {
    this.bookEditForm = this.fb.group({
      brStrana: ['', [Validators.required]],
      pismo: [''],
      povez: ['', [Validators.required]],
      format: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
    });
  }

  patchEditForm() {
    this.bookEditForm.patchValue({
      brStrana: this.bookToEdit.book.pages,
      pismo: this.bookToEdit.book.script,
      povez: this.bookToEdit.book.bookbind,
      format: this.bookToEdit.book.format.id,
      isbn: this.bookToEdit.book.isbn,
    });
    this.isLoaded = true;
  }

  onSubmit() {
    console.log(this.bookEditForm.value);
    this.storeToParent();
  }

  storeToParent() {
    this.formEmitter.emit(this.bookEditForm.value);
  }
}
