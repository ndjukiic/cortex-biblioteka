import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit-details',
  templateUrl: './book-edit-details.component.html',
})
export class BookEditDetailsComponent implements OnInit {
  bookToEdit: Book;
  id: number;
  bookEditForm: FormGroup;
  @Input() formEmitter = new EventEmitter<Book>();

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit() {
    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
      console.log('post-load log', response);
    });
  }

  onSubmit(){
    console.log('posle edita', this.bookToEdit);
    this.storeToParent();
  }

  storeToParent(){
    this.formEmitter.emit(this.bookToEdit);
  }
}
