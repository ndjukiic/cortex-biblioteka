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
  toReturn = [];
  id: number;
  viewSize: number;
  currentPage: number;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
    this.id = this.bookService.getBookID();

    this.bookService.getAllBookActivities(this.id).subscribe((response) => {
      this.toReturn = response.data.izdate;
    });
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

  formatDate(action_date: string) {
    const formattedDate = action_date.split(' ')[0].split('-');
    const day = formattedDate[2];
    const month = formattedDate[1];
    const year = formattedDate[0];

    const fullDate = `${day}.${month}.${year}`;

    return fullDate;
  }

  getDaysAgo(action_date: string) {
    const reservationDate = new Date(action_date);
    let interval: number;

    const ms = Date.now() - Number(reservationDate);

    if (Date().includes('GMT+0100')) {
      interval = ms - 3600000;
    } else {
      interval = ms;
    }

    let time = this.bookService.msRoundup(interval);

    return time;
  }

  checkTransgression(action_date: string) {
    //1296000000
    const reservationDate = new Date(action_date);
    let interval: number;
    let time: string;

    const ms = Date.now() - Number(reservationDate);

    if (Date().includes('GMT+0100')) {
      interval = ms - 3600000;
    } else {
      interval = ms;
    }

    if (interval > 1296000000) {
      time = this.bookService.msInDays(interval);
    } else {
      return;
    }

    return time;
  }
}
