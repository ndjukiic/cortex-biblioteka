import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
    });
  }

  initChanges() {
    this.bookEditForm = new FormGroup({
      brStrana: new FormControl(this.bookToEdit.book.pages),
      pismo: new FormControl(this.bookToEdit.book.script.id),
      povez: new FormControl(this.bookToEdit.book.bookbind.id),
      format: new FormControl(this.bookToEdit.book.format.id),
      isbn: new FormControl(this.bookToEdit.book.isbn),
    });
  }

  onSubmit() {
    this.initChanges();
    this.storeToParent();
  }

  storeToParent() {
    this.formEmitter.emit(this.bookEditForm.value);
  }
}
