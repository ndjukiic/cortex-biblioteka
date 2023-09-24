import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/student/models/student.model';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-student-tab-detail',
  templateUrl: './student-tab-detail.component.html',
  styleUrls: ['./student-tab-detail.component.css'],
})
export class StudentTabDetailComponent implements OnInit {
  student: Student = {
    id: 0,
    role: '',
    jmbg: '',
    photoPath: '',
    username: '',
    name: '',
    surname: '',
    email: '',
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent() {
    const id = this.studentService.getId();
    this.studentService.loadStudent(id).subscribe({
      next: (student: Student) => {
        this.student = student;
      },
      error: (error) => {
        console.error('Greška pri učitavanju studenta', error);
      },
    });
  }
}
