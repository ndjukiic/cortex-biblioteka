import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-tab-details',
  templateUrl: './book-tab-details.component.html',
})
export class BookTabDetailsComponent implements OnInit{
  book: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.currentBook$.subscribe(book => {
      this.book = book;
    });
  }
}
