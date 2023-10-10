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
