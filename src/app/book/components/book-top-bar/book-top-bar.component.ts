import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-top-bar',
  templateUrl: './book-top-bar.component.html',
})
export class BookTopBarComponent implements OnInit {
  book: Book;
  id: number;
  @Input() bookMode: boolean;
  @Input() dismissMode: boolean;
  @Input() issueMode: boolean;
  @Input() reserveMode: boolean;
  @Input() returnMode: boolean;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.id = this.bookService.getBookID();

    this.bookService.currentBook$.subscribe((book) => {
      this.book = book;
    });
  }

  getCoverImage(): string {
    const fallbackPath = '../../../../assets/images/tomsojer.jpg';

    if (this.book && this.book.pictures) {
      const coverImage = this.book.pictures.find(
        (pic: any) => pic && pic.cover === 1
      ) as any;
      return coverImage ? coverImage.path : fallbackPath;
    } else {
      return fallbackPath;
    }
  }

  onDelete() {
    const confirmDelete = window.confirm(
      `Da li ste sigurni da želite da izbrišete knjigu ${this.book.title}?`
    );

    if (confirmDelete) {
      this.bookService.deleteBook(this.id).subscribe((response) => {
        this.router.navigate(['/books']);
      });
    } else {
      alert('Brisanje knjige je prekinuto.');
    }
  }
}
