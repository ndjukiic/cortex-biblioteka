import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  bookToEmit: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
    });
  }

  onSubmit() {
    this.bookToEmit = this.bookToEdit.book;
    this.storeToParent();
  }

  storeToParent(){
    this.formEmitter.emit(this.bookToEmit);
  }
}
