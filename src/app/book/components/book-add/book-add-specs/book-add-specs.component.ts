import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      brStrana: new FormControl(null),
      pismo: new FormControl(null),
      povez: new FormControl(null),
      format: new FormControl(null),
      isbn: new FormControl(null)
    });
  }

  onSubmit() {
    this.storeToParent();
  }

  storeToParent(){
    this.formEmitter.emit(this.bookAddForm.value);
  }
}
