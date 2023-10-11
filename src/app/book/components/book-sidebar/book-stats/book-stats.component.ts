import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.bookService.currentBook$.subscribe(book => {
      this.book = book;
      this.totalSamples =
        this.book.samples -
        this.book.rSamples -
        this.book.bSamples -
        this.book.fSamples;
    });
  }
}
