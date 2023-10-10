import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from '../../../models/borrowed-book.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-archived-reservations',
  templateUrl: './activity-archived-reservations.component.html',
  styleUrls: ['./activity-archived-reservations.component.css'],
})
export class ActivityArchivedReservationsComponent implements OnInit {
  archivedReservations: BorrowedBook[];
  filteredArchivedReservations: BorrowedBook[];
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
    this.activityService
      .loadArchivedReservations()
      .subscribe((archivedReservations) => {
        this.archivedReservations = archivedReservations;
        this.totalPages = Math.ceil(this.archivedReservations.length / this.rowsPerPage);
        this.setPageRange();
      });
  }

  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +(this.rowsPerPage);
    if (this.searchName && this.searchName.trim() !== '') {
      this.filteredArchivedReservations = this.filteredResults.slice(this.startIndex, this.endIndex);
    } else {
      this.filteredArchivedReservations = this.archivedReservations.slice(this.startIndex, this.endIndex);
    }
  }

  filterBooks() {
    if (this.searchName && this.searchName.trim() !== '') {
      this.currentPage = 1;
      this.filteredResults = this.archivedReservations.filter((book: BorrowedBook) => {
        const searchValue = this.searchName.toLowerCase();
        return book.knjiga.title.toLowerCase().includes(searchValue);
      });
      this.filteredArchivedReservations = this.filteredResults.slice(0, this.rowsPerPage);
      this.totalPages = Math.ceil(this.filteredResults.length / this.rowsPerPage);
    } else {
      this.setPageRange();
      this.totalPages = Math.ceil(this.archivedReservations.length / this.rowsPerPage);
    }
  }

  sortBooksByName() {
    this.archivedReservations.sort((a, b) => {
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
