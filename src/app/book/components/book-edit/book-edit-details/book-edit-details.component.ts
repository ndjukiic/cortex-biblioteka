import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
  bookToEdit: Book;
  bookEditForm: FormGroup;
  isLoaded: boolean = false;

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initEditForm();

    this.id = +this.bookService.getBookID();
    this.bookService.loadBookForEdit(this.id).subscribe((response) => {
      this.bookToEdit = response;
      this.patchEditForm();
    });

    setTimeout(() => {
      this.loadCKEditor();
    }, 500);
  }

  initEditForm() {
    this.bookEditForm = this.fb.group({
      nazivKnjiga: ['', [Validators.required]],
      kratki_sadrzaj: [''],
      categories: ['', [Validators.required]],
      genres: ['', [Validators.required]],
      authors: ['', [Validators.required]],
      izdavac: ['', [Validators.required]],
      godinaIzdavanja: ['', [Validators.required, Validators.maxLength(4)]],
      knjigaKolicina: ['', [Validators.required, this.greaterThanZero]],
    });
  }

  patchEditForm() {
    this.bookEditForm.patchValue({
      nazivKnjiga: this.bookToEdit.book.title,
      kratki_sadrzaj: this.bookToEdit.book.description,
      categories: this.bookToEdit.book.categories,
      genres: this.bookToEdit.book.genres,
      authors: this.bookToEdit.book.authors,
      izdavac: this.bookToEdit.book.publisher,
      godinaIzdavanja: this.bookToEdit.book.pDate,
      knjigaKolicina: this.bookToEdit.book.quantity,
    });
    this.isLoaded = true;
  }

  loadCKEditor() {
    CKEDITOR.replace('content');
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
    const content = this.getDataFromCKEditor();
    this.bookEditForm.get('kratki_sadrzaj').setValue(content);
    this.storeToParent();
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
    console.log(data, 'ckeditor');
    return data;
  }
}
