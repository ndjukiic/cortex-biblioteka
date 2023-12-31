import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../services/activity.service';
import { BorrowedBook } from 'src/app/activity/models/borrowed-book.model';

@Component({
  selector: 'app-activity-returned-list',
  templateUrl: './activity-returned-list.component.html',
  styleUrls: ['./activity-returned-list.component.css']
})
export class ActivityReturnedListComponent implements OnInit{
  returnedBooks: BorrowedBook[];
  filteredReturnedBooks: BorrowedBook[];
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
    this.activityService.loadReturnedBooks().subscribe(
      returnedBook => {
        this.returnedBooks = returnedBook;
        this.totalPages = Math.ceil(this.returnedBooks.length / this.rowsPerPage);
        this.setPageRange();
      }
    )
  }

  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +(this.rowsPerPage);
    if (this.searchName && this.searchName.trim() !== '') {
      this.filteredReturnedBooks = this.filteredResults.slice(this.startIndex, this.endIndex);
    } else {
      this.filteredReturnedBooks = this.returnedBooks.slice(this.startIndex, this.endIndex);
    }
  }

  filterBooks() {
    if (this.searchName && this.searchName.trim() !== '') {
      this.currentPage = 1;
      this.filteredResults = this.returnedBooks.filter((book: BorrowedBook) => {
        const searchValue = this.searchName.toLowerCase();
        return book.knjiga.title.toLowerCase().includes(searchValue);
      });
      this.filteredReturnedBooks = this.filteredResults.slice(0, this.rowsPerPage);
      this.totalPages = Math.ceil(this.filteredResults.length / this.rowsPerPage);
    } else {
      this.setPageRange();
      this.totalPages = Math.ceil(this.returnedBooks.length / this.rowsPerPage);
    }
  }

  sortBooksByName() {
    this.returnedBooks.sort((a, b) => {
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

  calculateRetentionDays(borrowDate: string, actionDate: string): number {
    const borrowDateObj = new Date(borrowDate);
    const actionDateObj = new Date(actionDate);

    const timeDiff = actionDateObj.getTime() - borrowDateObj.getTime();
    const retentionDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    return retentionDays;
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
