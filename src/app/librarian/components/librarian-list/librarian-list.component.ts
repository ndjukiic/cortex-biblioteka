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
  subscription: Subscription;
  searchName: string;
  ascendingOrder: boolean = true;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number;

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
        this.filteredLibrarians = this.librarians.slice(0, this.rowsPerPage);
      });
  }

  filterLibrarians() {
    this.currentPage = 1;
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    
    if (this.searchName && this.searchName.trim() !== '') {
      const filteredResults = this.librarians.filter((librarian: Librarian) => {
        const fullName = `${librarian.name} ${librarian.surname}`;
        const searchValue = this.searchName.toLowerCase();
        return fullName.toLowerCase().includes(searchValue);
      });
      this.filteredLibrarians = filteredResults.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(filteredResults.length / this.rowsPerPage);
    } else {
      this.filteredLibrarians = this.librarians.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(this.librarians.length / this.rowsPerPage);
    }
  }
  
  sortLibrariansByName() {
    this.ascendingOrder = !this.ascendingOrder;
    
    const sortFunction = (a: Librarian, b: Librarian) => {
      const fullNameA = `${a.name} ${a.surname}`;
      const fullNameB = `${b.name} ${b.surname}`;
      return this.ascendingOrder
        ? fullNameA.localeCompare(fullNameB)
        : fullNameB.localeCompare(fullNameA);
    };
    this.librarians.sort(sortFunction);
  
    this.totalPages = Math.ceil(this.librarians.length / this.rowsPerPage);
    this.currentPage = 1;
  
    if (this.searchName && this.searchName.trim() !== '') {
      this.filterLibrarians();
    } else {
      this.updateFilteredLibrarians();
    }
  }

  onRowsPerPageChange() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
  
    if (this.searchName && this.searchName.trim() !== '') {
      const filteredResults = this.librarians.filter((librarian: Librarian) => {
        const fullName = `${librarian.name} ${librarian.surname}`;
        const searchValue = this.searchName.toLowerCase();
        return fullName.toLowerCase().includes(searchValue);
      });
      this.totalPages = Math.ceil(filteredResults.length / this.rowsPerPage);
      this.filteredLibrarians = filteredResults.slice(startIndex, endIndex);
    } else {
      this.totalPages = Math.ceil(this.librarians.length / this.rowsPerPage);
      this.filteredLibrarians = this.librarians.slice(startIndex, endIndex);
    }
  }
  
  updateFilteredLibrarians() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.filteredLibrarians = this.librarians.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredLibrarians();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredLibrarians();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
