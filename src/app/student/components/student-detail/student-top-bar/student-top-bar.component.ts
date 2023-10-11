import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/student/models/student.model';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-student-top-bar',
  templateUrl: './student-top-bar.component.html',
  styleUrls: ['./student-top-bar.component.css'],
})
export class StudentTopBarComponent {
  @Input() student: Student;

  constructor(private studentService: StudentService, private router: Router) {}

  deleteStudent() {
    const confirmation = window.confirm(
      `Da li ste sigurni da želite da izbrišete korisnika ${this.student?.name} ${this.student?.surname}?`
    );

    if (confirmation) {
      this.studentService.deleteStudent(this.student.id).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }
}
