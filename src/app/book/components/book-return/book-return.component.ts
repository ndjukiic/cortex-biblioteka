import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
})
export class BookReturnComponent implements OnInit, OnDestroy {
  returnMode = true;
  books: Book[];
  filteredArray: Book[];
  subscription: Subscription;
  searchName: string;
  sorted = false;
  viewSize: number;
  currentPage: number;

  constructor(
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadBooks() {
    this.subscription = this.bookService
      .loadBooks()
      .subscribe((books: Book[]) => {
        this.books = books;
        this.filteredArray = this.books.slice();
      });
  }
}
