import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-book-tab-specifications',
  templateUrl: './book-tab-specifications.component.html',
})
export class BookTabSpecificationsComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.currentBook$.subscribe(
      book => {
        this.book = book;
      }
    )
  }
}
