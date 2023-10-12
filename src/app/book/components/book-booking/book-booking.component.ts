import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/student/models/student.model';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-book-booking',
  templateUrl: './book-booking.component.html',
})
export class BookBookingComponent implements OnInit {
  bookMode = true;
  studentList: Student[];
  startDate: Date;
  endDate: Date;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.loadStudents().subscribe((response: Student[]) => {
      this.studentList = response;
    });

  }
}
