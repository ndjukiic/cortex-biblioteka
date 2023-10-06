import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit-multimedia',
  templateUrl: './book-edit-multimedia.component.html',
})
export class BookEditMultimediaComponent implements OnInit {
  bookToEdit: Book;
  id: number;
  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
    });
  }
}
