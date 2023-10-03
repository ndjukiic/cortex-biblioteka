import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit-details',
  templateUrl: './book-edit-details.component.html',
})
export class BookEditDetailsComponent implements OnInit {
  bookToEdit: Book;
  id: number;
  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
      console.log(this.bookToEdit);
    });
  }
}
