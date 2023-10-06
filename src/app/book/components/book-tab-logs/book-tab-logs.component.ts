import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-book-tab-logs',
  templateUrl: './book-tab-logs.component.html',
})
export class BookTabLogsComponent implements OnInit {
  dummyData = [
    {
      name: 'placeholder',
    },
  ];
  
  book: Book;
  id: number;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.id = this.bookService.getBookID();
    this.bookService.loadBook(this.id).subscribe((book: Book) => {
      this.book = book;
    });
  }
}
