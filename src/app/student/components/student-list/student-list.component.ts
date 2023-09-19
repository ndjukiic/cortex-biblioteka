import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: Student[];
  filteredStudents: Student[];
  subscription: Subscription;
  searchName: string;
  ascendingOrder: boolean = true;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.subscription = this.studentService
      .loadStudents()
      .subscribe((students: Student[]) => {
        this.students = students;
        this.totalPages = Math.ceil(this.students.length / this.rowsPerPage);
        this.filteredStudents = this.students.slice(0, this.rowsPerPage);
      });
  }

  filterStudents() {
    this.currentPage = 1;
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    
    if (this.searchName && this.searchName.trim() !== '') {
      const filteredResults = this.students.filter((student: Student) => {
        const fullName = `${student.name} ${student.surname}`;
        const searchValue = this.searchName.toLowerCase();
        return fullName.toLowerCase().includes(searchValue);
      });
      this.filteredStudents = filteredResults.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(filteredResults.length / this.rowsPerPage);
    } else {
      this.filteredStudents = this.students.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(this.students.length / this.rowsPerPage);
    }
  }
  
  sortStudentsByName() {
    this.ascendingOrder = !this.ascendingOrder;
    
    const sortFunction = (a: Student, b: Student) => {
      const fullNameA = `${a.name} ${a.surname}`;
      const fullNameB = `${b.name} ${b.surname}`;
      return this.ascendingOrder
        ? fullNameA.localeCompare(fullNameB)
        : fullNameB.localeCompare(fullNameA);
    };
    this.students.sort(sortFunction);
  
    this.totalPages = Math.ceil(this.students.length / this.rowsPerPage);
    this.currentPage = 1;
  
    if (this.searchName && this.searchName.trim() !== '') {
      this.filterStudents();
    } else {
      this.updateFilteredStudents();
    }
  }

  onRowsPerPageChange() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
  
    if (this.searchName && this.searchName.trim() !== '') {
      const filteredResults = this.students.filter((student: Student) => {
        const fullName = `${student.name} ${student.surname}`;
        const searchValue = this.searchName.toLowerCase();
        return fullName.toLowerCase().includes(searchValue);
      });
      this.totalPages = Math.ceil(filteredResults.length / this.rowsPerPage);
      this.filteredStudents = filteredResults.slice(startIndex, endIndex);
    } else {
      this.totalPages = Math.ceil(this.students.length / this.rowsPerPage);
      this.filteredStudents = this.students.slice(startIndex, endIndex);
    }
  }
  
  updateFilteredStudents() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.filteredStudents = this.students.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredStudents();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredStudents();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}