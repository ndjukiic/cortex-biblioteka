import { Component, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  filteredArray: Book[];
  subscription: Subscription;
  searchName: string;
  sorted = false;
  viewSize: number;
  currentPage: number;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadBooks() {
    this.subscription = this.bookService
      .loadBooks()
      .subscribe((books: Book[]) => {
        this.books = books;
        this.filteredArray = this.books.slice();
      });
  }

  filterBooks() {
    this.filteredArray = this.books.filter((book: Book) => {
      return book.title.toLowerCase().indexOf(this.searchName) !== -1;
    });
  }

  sort() {
    if (!this.sorted) {
      this.filteredArray.sort((a, b) => {
        this.sorted = true;
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
    } else if (this.sorted) {
      this.filteredArray = this.books.slice();
      this.sorted = false;
    }
  }

  pagPage() {
    if (this.currentPage < 1 || this.currentPage == null) {
      this.currentPage = 1;
    }
    const startIndex = (this.currentPage - 1) * this.viewSize;
    const endIndex = Number(startIndex) + Number(this.viewSize);

    this.filteredArray = this.books.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.pagPage();
    }
  }

  nextPage() {
    const maxPage = Math.round(this.books.length / this.viewSize);
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.pagPage();
    }
  }
}
