import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Student } from '../models/student.model';
import { ApiResponse } from 'src/app/shared/api-response.model';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = 'https://tim7.petardev.live/api/users';
  public students$ = new Subject<Student[]>();

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
}
