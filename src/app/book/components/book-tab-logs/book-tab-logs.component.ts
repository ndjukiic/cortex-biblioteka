import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivityService } from 'src/app/activity/services/activity.service';
@Component({
  selector: 'app-book-tab-logs',
  templateUrl: './book-tab-logs.component.html',
  styleUrls: ['./book-tab-logs.component.css'],
})
export class BookTabLogsComponent implements OnInit {

  book: Book;

  constructor(private bookService: BookService, private activityService: ActivityService) {}

  ngOnInit() {
    this.bookService.currentBook$.subscribe((book) => {
      this.book = book;
    });
  }
}
