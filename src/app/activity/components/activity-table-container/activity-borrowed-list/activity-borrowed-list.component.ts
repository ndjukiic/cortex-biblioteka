import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from '../../../models/borrowed-book.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-borrowed-list',
  templateUrl: './activity-borrowed-list.component.html',
  styleUrls: ['./activity-borrowed-list.component.css'],
})
export class ActivityBorrowedListComponent implements OnInit {
  borrowedBooks: BorrowedBook[];
  filteredBorrowedBooks: BorrowedBook[];
  filteredResults: BorrowedBook[];
  totalPages: number;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  startIndex: number;
  endIndex: number;
  searchName: string;
  ascendingOrder: boolean = true;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.loadBorrowedBooks().subscribe((borrowedBooks) => {
      this.borrowedBooks = borrowedBooks;
      this.totalPages = Math.ceil(this.borrowedBooks.length / this.rowsPerPage);
      this.setPageRange();
    });
  }

  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +this.rowsPerPage;
    if (this.searchName && this.searchName.trim() !== '') {
      this.filteredBorrowedBooks = this.filteredResults.slice(
        this.startIndex,
        this.endIndex
      );
    } else {
      this.filteredBorrowedBooks = this.borrowedBooks.slice(
        this.startIndex,
        this.endIndex
      );
    }
  }

  filterBooks() {
    if (this.searchName && this.searchName.trim() !== '') {
      this.currentPage = 1;
      this.filteredResults = this.borrowedBooks.filter((book: BorrowedBook) => {
        const searchValue = this.searchName.toLowerCase();
        return book.knjiga.title.toLowerCase().includes(searchValue);
      });
      this.filteredBorrowedBooks = this.filteredResults.slice(0, this.rowsPerPage);
      this.totalPages = Math.ceil(
        this.filteredResults.length / this.rowsPerPage
      );
    } else {
      this.setPageRange();
      this.totalPages = Math.ceil(this.borrowedBooks.length / this.rowsPerPage);
    }
  }

  sortBooksByName() {
    this.borrowedBooks.sort((a, b) => {
      const titleA = a.knjiga.title.toUpperCase();
      const titleB = b.knjiga.title.toUpperCase();

      if (this.ascendingOrder) {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    if (this.searchName && this.searchName.trim() !== '') {
      this.filterBooks();
    } else {
      this.setPageRange();
    }
    this.ascendingOrder = !this.ascendingOrder;
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
    this.filterBooks();
  }
}
