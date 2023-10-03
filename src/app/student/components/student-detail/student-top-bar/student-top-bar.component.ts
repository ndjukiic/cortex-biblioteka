import { Component, Input } from '@angular/core';
import { Student } from 'src/app/student/models/student.model';

@Component({
  selector: 'app-student-top-bar',
  templateUrl: './student-top-bar.component.html',
})
export class StudentTopBarComponent {

  @Input() student: Student;
}
