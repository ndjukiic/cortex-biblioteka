import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  student: Student;
  studentEditForm: FormGroup;

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const studentId = +this.route.snapshot.paramMap.get('id');
    this.studentService.loadStudent(studentId).subscribe((student: Student) => {
      this.student = student;
      
      this.studentEditForm.patchValue({
        'nameAndSurname': student.name + ' ' + student.surname,
        'jmbg': student.jmbg,
        'email': student.email,
        'username': student.username,
      });
    });
    
    this.studentEditForm = this.studentService.createStudentForm();
  }
  
  onSubmit() {
    this.studentService
      .saveOrEditStudent(this.studentEditForm, this.student.id)
      .subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
