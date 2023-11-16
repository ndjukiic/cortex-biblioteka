import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Student } from 'src/app/student/models/student.model';
import { StudentService } from 'src/app/student/services/student.service';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-issue',
  templateUrl: './book-issue.component.html',
})
export class BookIssueComponent implements OnInit {
  issueMode = true;
  studentList: Student[];
  reserveForm: FormGroup;
  id: number;
  returnDate = '';

  constructor(
    private studentService: StudentService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentService.loadStudents().subscribe((response: Student[]) => {
      this.studentList = response;
    });

    this.id = this.bookService.getBookID();

    this.reserveForm = new FormGroup({
      student_id: new FormControl(null),
      reserve_date: new FormControl(null),
    });
  }

  onSubmit() {
    this.bookService
      .reserveBook(this.reserveForm.value, +this.bookService.getBookID())
      .subscribe((response) => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

  
  dateInput() {
    const reserveDate = new Date(this.reserveForm.value.reserve_date); 
    const endDate = new Date(reserveDate);
    endDate.setDate(reserveDate.getDate() + 20); 
  
   
    this.returnDate = `${
      endDate.getMonth() + 1
    }/${endDate.getDate()}/${endDate.getFullYear()}`;
  }
  
}
