import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-edit-details',
  templateUrl: './book-edit-details.component.html',
})
export class BookEditDetailsComponent implements OnInit {
  @Output() formEmitter = new EventEmitter<Book>();
  bookToEdit: Book;
  id: number;
  bookEditForm: FormGroup;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
    });
  }

  initChanges(){
    this.bookEditForm = new FormGroup({
      nazivKnjiga: new FormControl(this.bookToEdit.book.title),
      kratki_sadrzaj: new FormControl(this.bookToEdit.book.description),
      categories: new FormControl(this.bookToEdit.book.categories),
      genres: new FormControl(this.bookToEdit.book.genres),
      authors: new FormControl(this.bookToEdit.book.authors),
      izdavac: new FormControl(this.bookToEdit.book.publisher.id),
      godinaIzdavanja: new FormControl(this.bookToEdit.book.pDate),
      knjigaKolicina: new FormControl(this.bookToEdit.book.samples),
      jezik: new FormControl(1),
      deletePdfs: new FormControl(0),
    })
  }

  onSubmit() {
    this.initChanges();
    this.storeToParent();
  }

  storeToParent() {
    this.formEmitter.emit(this.bookEditForm.value);
  }
}
