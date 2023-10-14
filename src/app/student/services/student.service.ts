import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { Student } from '../models/student.model';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { StudentCreate } from '../models/student-create.model';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = `${environment.apiUrl}/users`;
  public students$ = new BehaviorSubject<Student[]>(null);
  public student$ = new BehaviorSubject<Student>(null);

  constructor(private httpClient: HttpClient) {}

  loadStudents(): Observable<Student[]> {
    return this.httpClient
      .get(this.url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  editStudent(student: StudentCreate, id: number): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, student, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  saveStudent(
    studentForm: FormGroup,
    studentId: number | null = null
  ): Observable<any> {
    if (!studentForm.valid) {
      return throwError(() => new Error('Forma nije validna'));
    }

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
  }

  deleteStudent(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
