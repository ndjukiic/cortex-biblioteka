import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-add-specs',
  templateUrl: './book-add-specs.component.html',
  styleUrls: ['./book-add-specs.component.css'],
})
export class BookAddSpecsComponent implements OnInit {
  @Output() formEmitter = new EventEmitter<Book>();
  bookAddForm: FormGroup;

  ngOnInit() {
    this.bookAddForm = new FormGroup({
      brStrana: new FormControl(null, Validators.required),
      pismo: new FormControl(null, Validators.required),
      povez: new FormControl(null, Validators.required),
      format: new FormControl(null, Validators.required),
      isbn: new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
      ]),
    });
  }

  onSubmit() {
    this.storeToParent();
    this.bookAddForm.reset();
  }

  storeToParent() {
    this.formEmitter.emit(this.bookAddForm.value);
  }

  isbnLength() {}
}
