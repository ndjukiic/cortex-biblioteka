import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit {
  visibleComponent = 1;
  id: number;
  detailsData: Book;
  specsData: Book;
  editedBook: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.id = +this.bookService.getBookID();
  }

  showDetails() {
    this.visibleComponent = 1;
  }

  showSpecs() {
    this.visibleComponent = 2;
  }

  showMultimedia() {
    this.visibleComponent = 3;
  }

  detailsReceived(data: Book) {
    this.detailsData = data;
    if (this.specsData) {
      this.fullForm();
    }
  }

  specsReceived(data: Book) {
    this.specsData = data;
    if (this.detailsData) {
      this.fullForm();
    }
  }

  fullForm() {
    if (this.detailsData && this.specsData) {
      this.editedBook = {
        ...this.detailsData,
        ...this.specsData,
      };
      this.bookService.editBook(this.editedBook, this.id).subscribe(
        (response) => {},
        (error) => {
          alert(
            'Došlo je do naredne greške: ' +
              error.status +
              ' ' +
              error.statusText +
              '. Molimo Vas pokušajte kasnije, ili kontaktirajte administratore.'
          );
        }
      );
    }
  }
}
