import { Component } from '@angular/core';
import { Author } from '../../models/author.model';
import { Subscription } from 'rxjs';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})

export class AuthorListComponent {

  authors: Author[];
  author: Author;
  filteredArray: Author[];
  filteredStudents: Author[];
  filteredResults: Author[];
  subscription: Subscription;
  searchName: string;
  sorted = false;
  viewSize: number;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  


  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.loadAuthors();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 
  
  loadAuthors() {
      this.subscription = this.authorService
        .loadAuthors()
        .subscribe((authors: Author[]) => {
          this.authors = authors;
          this.totalPages = Math.ceil(this.authors.length / this.rowsPerPage);
          this.filteredArray = this.authors.slice();
        });
    }

    filterAuthors() {
      if (this.searchName && this.searchName.trim() !== '') {
        this.currentPage = 1;
         this.filteredResults = this.authors.filter((author: Author) => {
          const fullName = `${this.author.name} ${author.surname}`;
          const searchValue = this.searchName.toLowerCase();
          return fullName.toLowerCase().includes(searchValue);
        });
        this.filteredStudents = this.filteredResults.slice(0, this.rowsPerPage);
        this.totalPages = Math.ceil(this.filteredResults.length / this.rowsPerPage);
      } else {
        this.setPageRange();
        this.totalPages = Math.ceil(this.authors.length / this.rowsPerPage);
      }
    }

    setPageRange() {
      this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
      this.endIndex = this.startIndex + +(this.rowsPerPage);
      if (this.searchName && this.searchName.trim() !== '') {
        this.filteredStudents = this.filteredResults.slice(this.startIndex, this.endIndex);
      } else {
        this.filteredStudents = this.authors.slice(this.startIndex, this.endIndex);
      }
    }

    onRowsPerPageChange() {
      this.currentPage = 1;
      this.filterAuthors();
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
  


   lipsum =
     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";

     
}
