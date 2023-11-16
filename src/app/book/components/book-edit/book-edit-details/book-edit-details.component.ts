import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

declare var CKEDITOR: any;

@Component({
  selector: 'app-book-edit-details',
  templateUrl: './book-edit-details.component.html',
})
export class BookEditDetailsComponent implements OnInit {
  @Output() formEmitter = new EventEmitter<Book>();
  id: number;
  bookEditForm: FormGroup;
  isLoaded: boolean = false;
  data;
  existingBook: Book;
  dropdownSettings: IDropdownSettings = {};

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.initEditForm();

    this.bookService.getAllBookProperties().subscribe((response) => {
      this.data = response;
    });

    this.id = this.bookService.getBookID();

    this.bookService.loadBook(this.id).subscribe((response) => {
      this.existingBook = response;
      this.patchEditForm();
    });

    this.initDropdownSettings();
  }

  initEditForm() {
    this.bookEditForm = new FormGroup({
      nazivKnjiga: new FormControl(null, [Validators.required]),
      kratki_sadrzaj: new FormControl(null),
      categories: new FormControl(null, Validators.required),
      genres: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      izdavac: new FormControl(null, Validators.required),
      godinaIzdavanja: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4),
      ]),
      knjigaKolicina: new FormControl(null, [
        Validators.required,
        this.greaterThanZero,
      ]),
      jezik: new FormControl(1),
      deletePdfs: new FormControl(0),
      //lang and deletePdfs variables were required in api
    });
    this.isLoaded = true;
  }

  patchEditForm() {
    this.bookEditForm.patchValue({
      nazivKnjiga: this.existingBook.title,
      kratki_sadrzaj: this.existingBook.description,
      categories: this.existingBook.categories,
      genres: this.existingBook.genres,
      authors: this.existingBook.authors,
      izdavac: this.existingBook.publisher,
      godinaIzdavanja: this.existingBook.pDate,
      knjigaKolicina: this.existingBook.samples,
    });
    this.isLoaded = true;
    CKEDITOR.replace('content');
  }

  initDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Izaberi sve',
      unSelectAllText: 'Poništi izbor',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  greaterThanZero(control: FormControl): {
    [validation: string]: boolean;
  } {
    const value = control.value;
    if (value < 0) {
      return { greaterThanZero: false };
    }
    return null;
  }

  onSubmit() {
    this.formatContent();
    console.log(this.bookEditForm.value);
    this.storeToParent();
  }

  formatContent() {
    let categoryIDs = [];
    let genreIDs = [];
    let authorIDs = [];
    const content = this.getDataFromCKEditor();
    this.bookEditForm.get('kratki_sadrzaj').setValue(content);

    this.bookEditForm.get('categories').value.map((category) => {
      categoryIDs.push(category.id);
    });
    this.bookEditForm.get('genres').value.map((genre) => {
      genreIDs.push(genre.id);
    });
    this.bookEditForm.get('authors').value.map((author) => {
      authorIDs.push(author.id);
    });

    this.bookEditForm.get('categories').setValue(categoryIDs);
    this.bookEditForm.get('genres').setValue(genreIDs);
    this.bookEditForm.get('authors').setValue(categoryIDs);
  }

  storeToParent() {
    this.formEmitter.emit(this.bookEditForm.value);
  }

  getDataFromCKEditor() {
    const editor = CKEDITOR.instances.content;
    if (!editor) {
      return;
    }
    const data = editor.getData();
    return data;
  }
}
