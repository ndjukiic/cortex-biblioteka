import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BorrowedBook } from 'src/app/activity/models/borrowed-book.model';
import { ActivityService } from 'src/app/activity/services/activity.service';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-tab-borrowed',
  templateUrl: './book-tab-borrowed.component.html',
  styleUrls: ['./book-tab-borrowed.component.css'],
})
export class BookTabBorrowedComponent implements OnInit, OnDestroy {
  bookId: number;
  bookBorrows: BorrowedBook[];
  filteredBookBorrows: BorrowedBook[];
  totalPages: number;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  startIndex: number;
  endIndex: number;
  subscription: Subscription;

  constructor(
    private activityService: ActivityService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookId = this.bookService.getBookID();
    this.loadBookBorrows();
  }  

  loadBookBorrows() {
    this.subscription = this.activityService
      .loadBorrowedBooks(this.bookId)
      .subscribe((response) => {
        this.bookBorrows = response;
        this.totalPages = Math.ceil(this.bookBorrows.length / this.rowsPerPage);
        this.setPageRange();
      });
  }

  calculateDaysBorrowed(borrowDate: string): number {
    const currentDate = new Date();
    const borrowDateObj = new Date(borrowDate);
    const timeDiff = currentDate.getTime() - borrowDateObj.getTime();
    const daysBorrowed = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysBorrowed;
  }

  checkIfOverdue(returnDate: string): boolean {
    const currentDate = new Date();
    const returnDateObj = new Date(returnDate);
    return returnDateObj < currentDate
  }

  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +this.rowsPerPage;
    this.filteredBookBorrows = this.bookBorrows.slice(
      this.startIndex,
      this.endIndex
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPageRange();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPageRange();
    }
  }

  onRowsPerPageChange() {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.bookBorrows.length / this.rowsPerPage);
    this.setPageRange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
