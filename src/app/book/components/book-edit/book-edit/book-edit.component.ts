import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit {
  visibleComponent = 1;

  constructor() {}

  ngOnInit() {}

  showDetails() {
    this.visibleComponent = 1;
  }

  showSpecs() {
    this.visibleComponent = 2;
  }

  showMultimedia() {
    this.visibleComponent = 3;
  }
}
