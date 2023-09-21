import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-book-tab-multimedia',
  templateUrl: './book-tab-multimedia.component.html',
  styleUrls: ['./book-tab-multimedia.component.css']
})
export class BookTabMultimediaComponent implements OnInit {
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