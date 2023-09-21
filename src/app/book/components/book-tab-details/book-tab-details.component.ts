import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-tab-details',
  templateUrl: './book-tab-details.component.html',
  styleUrls: ['./book-tab-details.component.css'],
})
export class BookTabDetailsComponent implements OnInit {
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
