import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-stats',
  templateUrl: './book-stats.component.html',
})
export class BookStatsComponent implements OnInit {
  book: Book;
  totalSamples: number;

  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.bookService.currentBook$.subscribe((book) => {
      this.book = book;
      console.log(this.book);
      this.totalSamples =
        book.samples - book.rSamples - book.bSamples - book.fSamples;
    });
  }
}
