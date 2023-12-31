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
  filteredResults: Student[];
  subscription: Subscription;
  searchName: string;
  ascendingOrder: boolean = true;
  rowsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number;
  startIndex: number;
  endIndex: number;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.subscription = this.studentService
      .loadStudents()
      .subscribe((students: Student[]) => {
        this.students = students;
        console.log(this.students);
        this.totalPages = Math.ceil(this.students.length / this.rowsPerPage);
        this.setPageRange();
      });
  }

  filterStudents() {
    if (this.searchName && this.searchName.trim() !== '') {
      this.currentPage = 1;
       this.filteredResults = this.students.filter((student: Student) => {
        const fullName = `${student.name} ${student.surname}`;
        const searchValue = this.searchName.toLowerCase();
        return fullName.toLowerCase().includes(searchValue);
      });
      this.filteredStudents = this.filteredResults.slice(0, this.rowsPerPage);
      this.totalPages = Math.ceil(this.filteredResults.length / this.rowsPerPage);
    } else {
      this.setPageRange();
      this.totalPages = Math.ceil(this.students.length / this.rowsPerPage);
    }
  }
  
  onRowsPerPageChange() {
    this.currentPage = 1;
    this.filterStudents();
  }

  sortStudentsByName() {
    this.ascendingOrder = !this.ascendingOrder;
    this.currentPage = 1;
    
    const sortFunction = (a: Student, b: Student) => {
      const fullNameA = `${a.name} ${a.surname}`;
      const fullNameB = `${b.name} ${b.surname}`;
      return this.ascendingOrder
        ? fullNameA.localeCompare(fullNameB)
        : fullNameB.localeCompare(fullNameA);
    };
    this.students.sort(sortFunction);
    this.totalPages = Math.ceil(this.students.length / this.rowsPerPage);
  
    if (this.searchName && this.searchName.trim() !== '') {
      this.filterStudents();
    } else {
      this.setPageRange();
    }
  }

  setPageRange() {
    this.startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.endIndex = this.startIndex + +(this.rowsPerPage);
    if (this.searchName && this.searchName.trim() !== '') {
      this.filteredStudents = this.filteredResults.slice(this.startIndex, this.endIndex);
    } else {
      this.filteredStudents = this.students.slice(this.startIndex, this.endIndex);
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