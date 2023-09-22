import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      nazivKnjiga: new FormControl(null, [Validators.required]),
      kratki_sadrzaj: new FormControl(null, [Validators.required]),
      categories: new FormControl(null, Validators.required),
      genres: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      izdavac: new FormControl(null, Validators.required),
      godinaIzdavanja: new FormControl(null, [Validators.required, Validators.maxLength(4)]),
      knjigaKolicina: new FormControl(null, Validators.required),
      jezik: new FormControl(1), 
      deletePdfs: new FormControl(0),
      //lang and deletePdfs variables were required in api, even though they weren't in the prototype form - therefore the static content (temporarily)
    });
  }

  onSubmit() {
    this.storeToParent();
    this.bookAddForm.reset();
    
  }

  storeToParent(){
    this.formEmitter.emit(this.bookAddForm.value);
  }
}
