import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Librarian } from '../../models/librarian.model';
import { LibrarianService } from '../../services/librarian.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './librarian-list.component.html',
  styleUrls: ['./librarian-list.component.css'],
})
export class LibrarianListComponent implements OnInit, OnDestroy {
  librarians: Librarian[];
  filteredLibrarians: Librarian[];
  filteredResults: Librarian[];
  subscription: Subscription;
  searchName: string;
  ascendingOrder: boolean = true;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number;
  startIndex: number;
  endIndex: number;

  constructor(private librarianService: LibrarianService) {}

  ngOnInit(): void {
    this.loadLibrarians();
  }

  loadLibrarians() {
    this.subscription = this.librarianService
      .loadLibrarians()
      .subscribe((librarians: Librarian[]) => {
        this.librarians = librarians;
        this.totalPages = Math.ceil(this.librarians.length / this.rowsPerPage);
        this.setPageRange();
      });
  }

  filterLibrarians() {
    if (this.searchName && this.searchName.trim() !== '') {
      this.currentPage = 1;
      this.filteredResults = this.librarians.filter((librarian: Librarian) => {
        const fullName = `${librarian.name} ${librarian.surname}`;
        const searchValue = this.searchName.toLowerCase();
        return fullName.toLowerCase().includes(searchValue);
      });
      this.filteredLibrarians = this.filteredResults.slice(0, this.rowsPerPage);
      this.totalPages = Math.ceil(this.filteredResults.length / this.rowsPerPage);
    } else {
      this.setPageRange();
      this.totalPages = Math.ceil(this.librarians.length / this.rowsPerPage);
    }
  }
  
  onRowsPerPageChange() {
    this.currentPage = 1;
    this.filterLibrarians();
  }

  sortLibrariansByName() {
    this.ascendingOrder = !this.ascendingOrder;
    this.currentPage = 1;
    
    const sortFunction = (a: Librarian, b: Librarian) => {
      const fullNameA = `${a.name} ${a.surname}`;
      const fullNameB = `${b.name} ${b.surname}`;
      return this.ascendingOrder
        ? fullNameA.localeCompare(fullNameB)
        : fullNameB.localeCompare(fullNameA);
    };
    this.librarians.sort(sortFunction);
    this.totalPages = Math.ceil(this.librarians.length / this.rowsPerPage);
  
    if (this.searchName && this.searchName.trim() !== '') {
      this.filterLibrarians();
    } else {
      this.setPageRange();
    }
  }

  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +(this.rowsPerPage);
    if (this.searchName && this.searchName.trim() !== '') {
      this.filteredLibrarians = this.filteredResults.slice(this.startIndex, this.endIndex);
    } else {
      this.filteredLibrarians = this.librarians.slice(this.startIndex, this.endIndex);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}