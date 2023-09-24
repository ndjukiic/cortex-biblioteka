import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap, throwError } from 'rxjs';
import { Student } from '../models/student.model';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { StudentCreate } from '../models/student-create.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = 'https://tim7.petardev.live/api/users';
  public students$ = new Subject<Student[]>();
  public student$ = new Subject<Student>();
  public id: number;

  constructor(private httpClient: HttpClient) {}

  loadStudents(): Observable<Student[]> {
    return this.httpClient
      .get(this.url, {
        headers: {
          Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
        },
      })
      .pipe(
        map((response: ApiResponse<Student[]>) => {
          const studentsOnly = response.data.filter(
            (user) => user.role === 'Učenik'
          );
          this.students$.next(studentsOnly);
          return studentsOnly;
        })
      );
  }

  loadStudent(id: number): Observable<Student> {
    return this.httpClient
      .get<ApiResponse<Student>>(`${this.url}/${id}`, {
        headers: {
          Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
        },
      })
      .pipe(
        map((response: ApiResponse<Student>) => {
          this.student$.next(response.data);
          return response.data;
        })
      );
  }

  createNewStudent(student: StudentCreate): Observable<any> {
    return this.httpClient.post(`${this.url}/store`, student, {
      headers: {
        Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
      },
    });
  }

  editStudent(student: StudentCreate, id: number): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, student, {
      headers: {
        Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
      },
    });
  }

  createStudentForm() {
    return new FormGroup({
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

  saveOrEditStudent(
    studentForm: FormGroup,
    studentId: number | null = null
  ): Observable<any> {
    if (studentForm.valid) {
      const nameAndSurname = studentForm.get('nameAndSurname').value;
      const fullName = nameAndSurname.split(/\s(.+)/);
      const name = fullName[0];
      const surname = fullName[1];

      const studentData: StudentCreate = {
        role_id: 1,
        name: name,
        surname: surname,
        jmbg: studentForm.get('jmbg').value,
        email: studentForm.get('email').value,
        username: studentForm.get('username').value,
        password: studentForm.get('password').value,
        password_confirmation: studentForm.get('confirmPassword').value,
      };

      if (studentId) {
        return this.editStudent(studentData, studentId).pipe(
          tap(() => {
            this.loadStudents();
            studentForm.reset();
          })
        );
      } else {
        return this.createNewStudent(studentData).pipe(
          tap(() => {
            this.loadStudents();
            studentForm.reset();
          })
        );
      }
    } else {
      return throwError(() => new Error('Forma nije validna'));
    }
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

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }
}
