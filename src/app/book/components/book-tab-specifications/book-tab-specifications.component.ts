import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-book-tab-specifications',
  templateUrl: './book-tab-specifications.component.html',
  styleUrls: ['./book-tab-specifications.component.css'],
})
export class BookTabSpecificationsComponent implements OnInit {
  book: Book;
  id: number;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.id = this.bookService.getBookID();
    this.bookService.loadBook(this.id).subscribe((book: Book) => {
      this.book = book;
      console.log(book.format)
    });
  }
}
