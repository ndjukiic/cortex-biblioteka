import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from '../../../models/borrowed-book.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-overdue-list',
  templateUrl: './activity-overdue-list.component.html',
  styleUrls: ['./activity-overdue-list.component.css']
})
export class ActivityOverdueListComponent implements OnInit {
  overdueBooks: BorrowedBook[];
  filteredOverdueBooks: BorrowedBook[];
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
    this.activityService.loadOverdueBooks().subscribe(
      overdueBooks => {
        this.overdueBooks = overdueBooks;
        this.totalPages = Math.ceil(this.overdueBooks.length / this.rowsPerPage);
        this.setPageRange();
      }
    )
  }

  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +(this.rowsPerPage);
    if (this.searchName && this.searchName.trim() !== '') {
      this.filteredOverdueBooks = this.filteredResults.slice(this.startIndex, this.endIndex);
    } else {
      this.filteredOverdueBooks = this.overdueBooks.slice(this.startIndex, this.endIndex);
    }
  }

  sortBooksByName() {
    this.overdueBooks.sort((a, b) => {
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

  filterBooks() {
    if (this.searchName && this.searchName.trim() !== '') {
      this.currentPage = 1;
      this.filteredResults = this.overdueBooks.filter((book: BorrowedBook) => {
        const searchValue = this.searchName.toLowerCase();
        return book.knjiga.title.toLowerCase().includes(searchValue);
      });
      this.filteredOverdueBooks = this.filteredResults.slice(0, this.rowsPerPage);
      this.totalPages = Math.ceil(this.filteredResults.length / this.rowsPerPage);
    } else {
      this.setPageRange();
      this.totalPages = Math.ceil(this.overdueBooks.length / this.rowsPerPage);
    }
  }

  getOverdueDays(returnDate: string): number {
    const returnDateObj = new Date(returnDate);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - returnDateObj.getTime());
    const overdueDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return overdueDays;
  }

  calculateHoldingDuration(borrowDate: string): number {
    const borrowDateObj = new Date(borrowDate);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - borrowDateObj.getTime();
    const holdingDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    return holdingDays;
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
