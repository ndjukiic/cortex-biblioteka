import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit-specs',
  templateUrl: './book-edit-specs.component.html',
})
export class BookEditSpecsComponent implements OnInit {
  bookToEdit: Book;
  id: number;
  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
    });
  }

  onSubmit(){
    
  }
}
