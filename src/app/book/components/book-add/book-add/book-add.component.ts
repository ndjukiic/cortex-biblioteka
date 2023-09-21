import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent {
  visibleComponent = 1;
  detailForm: Book;
  specsForm: Book;
  newBook: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.detailForm = data;
    console.log('detail form data', this.detailForm);
    if (this.specsForm) {
      this.fullForm();
    }
  }

  specsReceived(data: Book) {
    this.specsForm = data;
    console.log('specifications form data', this.specsForm);
    if (this.detailForm) {
      this.fullForm();
    }
  }

  fullForm() {
    if (this.detailForm && this.specsForm) {
      this.newBook = {
        ...this.detailForm,
        ...this.specsForm,
      };

      console.log(this.newBook);
    }
    if (this.newBook) {
      this.addBook();
    }
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe((response) => {
      console.log('JUPIIIII', response);
    });
    // this.router.navigate(['../'], { relativeTo: this.route });
    // for whatever reason - router breaks the form result addition to the list
  }
}
