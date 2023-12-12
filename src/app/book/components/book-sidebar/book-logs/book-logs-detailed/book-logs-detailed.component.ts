import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-logs-detailed',
  templateUrl: './book-logs-detailed.component.html',
})
export class BookLogsDetailedComponent implements OnInit {
  private id: number;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.id = this.bookService.getActivityID();
  }
}
