import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/student/models/student.model';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-student-top-bar',
  templateUrl: './student-top-bar.component.html',
  styleUrls: ['./student-top-bar.component.css'],
})
export class StudentTopBarComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent() {
    const id = +this.route.snapshot.params['id'];
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
