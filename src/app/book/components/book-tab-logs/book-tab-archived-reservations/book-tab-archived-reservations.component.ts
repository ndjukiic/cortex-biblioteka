import { Component } from '@angular/core';
import { BorrowedBook } from 'src/app/activity/models/borrowed-book.model';
import { ActivityService } from 'src/app/activity/services/activity.service';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-tab-archived-reservations',
  templateUrl: './book-tab-archived-reservations.component.html',
  styleUrls: ['./book-tab-archived-reservations.component.css']
})
export class BookTabArchivedReservationsComponent {
  bookId: number;
  bookArchivedReservations: BorrowedBook[];
  filteredBookArchivedReservations: BorrowedBook[];
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
    this.loadArchivedBookReservations();
  }
  
  loadArchivedBookReservations() {
    this.activityService.loadArchivedReservations(this.bookId).subscribe(
      response => {
        this.bookArchivedReservations= response;
        this.totalPages = Math.max(Math.ceil(this.bookArchivedReservations.length / this.rowsPerPage), 1);
        this.setPageRange();
      }
    );
  }
  
  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +(this.rowsPerPage);
      this.filteredBookArchivedReservations = this.bookArchivedReservations.slice(this.startIndex, this.endIndex);
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
    this.totalPages = Math.ceil(this.bookArchivedReservations.length / this.rowsPerPage);
    this.setPageRange();
  }
}
