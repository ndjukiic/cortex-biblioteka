import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-top-bar',
  templateUrl: './book-top-bar.component.html',
  styleUrls: ['./book-top-bar.component.css'],
})
export class BookTopBarComponent implements OnInit {
  book: Book;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((url) => {
      this.id = Number(url.get('id'));
    });

    this.bookService.loadBook(this.id).subscribe((book: Book) => {
      this.book = book;
    });
  }
}
