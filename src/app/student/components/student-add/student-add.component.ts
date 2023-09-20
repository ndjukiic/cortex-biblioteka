import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { StudentCreate } from '../../models/student-create.model';
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
    this.studentAddForm = new FormGroup({
      nameAndSurname: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        this.minTwoWords,
      ]),
      userType: new FormControl({ value: 'Učenik', disabled: true }),
      jmbg: new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_-]+$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.passwordMatch,
      ]),
      userImage: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.studentAddForm.valid) {
      const nameAndSurname = this.studentAddForm.get('nameAndSurname').value;
      const fullName = nameAndSurname.split(/\s(.+)/);
      const name = fullName[0];
      const surname = fullName[1];

      const studentData: StudentCreate = {
        role_id: 2,
        name: name,
        surname: surname,
        jmbg: this.studentAddForm.get('jmbg').value,
        email: this.studentAddForm.get('email').value,
        username: this.studentAddForm.get('username').value,
        password: this.studentAddForm.get('password').value,
        password_confirmation: this.studentAddForm.get('confirmPassword').value,
      };

      this.studentService.createNewStudent(studentData).subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.studentService.loadStudents();
          this.studentAddForm.reset();
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/students']);
  }
  
  minTwoWords(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return null;
    }
    const words = control.value
      .split(' ')
      .filter((word: string) => word.trim() != '');
    if (words.length < 2) {
      return { minimumTwoWords: true };
    }
    return null;
  }

  passwordMatch(control: AbstractControl): { [s: string]: boolean } | null {
    if (
      !control.parent ||
      !control.parent.get('password') ||
      !control.parent.get('confirmPassword')
    ) {
      return null;
    }
    const formGroup = control.parent as FormGroup;
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
