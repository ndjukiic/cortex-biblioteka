import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  studentAddForm: FormGroup;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentAddForm = this.studentService.createStudentForm();
  }

  onSubmit() {
    this.studentService.saveOrEditStudent(this.studentAddForm).subscribe({
      next: (response) => {
        console.log('Uspješno sačuvano', response);
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Greška', error);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/students']);
  }
}
