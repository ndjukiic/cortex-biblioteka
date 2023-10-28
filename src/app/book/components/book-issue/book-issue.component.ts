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
      datumRezervisanja: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.reserveForm.value);
    this.bookService
      .reserveBook(this.reserveForm.value, +this.bookService.getBookID())
      .subscribe((response) => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

  dateInput() {
    const endDate = new Date(this.reserveForm.value.datumRezervisanja);
    this.returnDate = `${
      endDate.getMonth() + 1
    }/${endDate.getDate()}/${endDate.getFullYear()}`;
    console.log(endDate);
    console.log(this.returnDate);
  }
}
