import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/student/models/student.model';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-student-tab-detail',
  templateUrl: './student-tab-detail.component.html',
  styleUrls: ['./student-tab-detail.component.css'],
})
export class StudentTabDetailComponent implements OnInit {

  student: Student;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.student$.subscribe((student: Student) => {
      this.student = student;
    })
  }
}