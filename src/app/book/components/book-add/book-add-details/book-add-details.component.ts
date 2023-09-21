import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-add-details',
  templateUrl: './book-add-details.component.html',
  styleUrls: ['./book-add-details.component.css'],
})
export class BookAddDetailsComponent implements OnInit {
  @Output() formEmitter = new EventEmitter<Book>();
  bookAddForm: FormGroup;

  ngOnInit() {
    this.bookAddForm = new FormGroup({
      nazivKnjiga: new FormControl(null),
      kratki_sadrzaj: new FormControl(null),
      categories: new FormControl(null),
      genres: new FormControl(null),
      authors: new FormControl(null),
      izdavac: new FormControl(null),
      godinaIzdavanja: new FormControl(null),
      knjigaKolicina: new FormControl(null),
      jezik: new FormControl(1),
      deletePdfs: new FormControl(0),
    });
  }

  onSubmit() {
    this.storeToParent();
  }

  storeToParent(){
    this.formEmitter.emit(this.bookAddForm.value);
  }
}
