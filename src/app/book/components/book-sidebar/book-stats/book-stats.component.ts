import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-stats',
  templateUrl: './book-stats.component.html',
  styleUrls: ['./book-stats.component.css'],
})
export class BookStatsComponent implements OnInit {
  book: Book;
  id: number;
  totalSamples: number;

  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.id = this.bookService.getBookID();
    this.bookService.loadBook(this.id).subscribe((response) => {
      this.book = response;
      this.totalSamples =
        this.book.samples -
        this.book.rSamples -
        this.book.bSamples -
        this.book.fSamples;
    });
  }
}
