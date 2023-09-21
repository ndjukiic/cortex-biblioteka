import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent {
  dummyData = [
    {
      name: 'knjiga1',
      author: 'John Johnson',
      category: 'Roman',
      available: 50,
      booked: 1,
      issued: 14,
      exceeded: 0,
      totalCopies: 65,
    },
  ];

  book: Book;
  id: number;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((url) => {
      this.bookService.setBookID(+url.get('id'));
    });
  }
}
