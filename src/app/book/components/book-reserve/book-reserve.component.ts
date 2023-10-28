import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/student/services/student.service';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/student/models/student.model';

@Component({
  selector: 'app-book-reserve',
  templateUrl: './book-reserve.component.html',
})
export class BookReserveComponent {
  reserveMode = true;
  reserveForm: FormGroup;
  studentList: Student[];
  id: number;
  returnDate = '';

  constructor(
    private studentService: StudentService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ){}

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


}
