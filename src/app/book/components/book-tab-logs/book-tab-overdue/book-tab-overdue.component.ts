import { Component } from '@angular/core';
import { BorrowedBook } from 'src/app/activity/models/borrowed-book.model';
import { ActivityService } from 'src/app/activity/services/activity.service';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-tab-overdue',
  templateUrl: './book-tab-overdue.component.html',
  styleUrls: ['./book-tab-overdue.component.css']
})
export class BookTabOverdueComponent {

  bookId: number;
  bookOverdue: BorrowedBook[];
  filteredBookOverdue: BorrowedBook[];
  totalPages: number;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  startIndex: number;
  endIndex: number;

  constructor(
    private activityService: ActivityService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookId = this.bookService.getBookID();
    this.loadOverdueBook();
  }
  
  loadOverdueBook() {
    this.activityService.loadOverdueBooks(this.bookId).subscribe(
      response => {
        this.bookOverdue= response;
        this.totalPages = Math.max(Math.ceil(this.bookOverdue.length / this.rowsPerPage), 1);
        this.setPageRange();
      }
    );
  }
  
  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +(this.rowsPerPage);
      this.filteredBookOverdue = this.bookOverdue.slice(this.startIndex, this.endIndex);
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
    this.totalPages = Math.ceil(this.bookOverdue.length / this.rowsPerPage);
    this.setPageRange();
  }

}
