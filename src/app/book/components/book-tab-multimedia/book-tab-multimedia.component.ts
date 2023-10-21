import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-book-tab-multimedia',
  templateUrl: './book-tab-multimedia.component.html',
})
export class BookTabMultimediaComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.currentBook$.subscribe((book) => {
      this.book = book;
    });
  }
}
