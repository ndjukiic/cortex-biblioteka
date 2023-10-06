import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/author.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private url = `${environment.apiUrl}/authors`;
  private authors$ = new Subject<Author[]>();

  constructor(private httpClient: HttpClient) {}

  loadBooks(): Observable<Author[]> {
    return this.httpClient
      .get<ApiResponse<Author[]>>(this.url, {
        headers: {
          Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',
        },
      })
      .pipe(
        map((response: ApiResponse<Author[]>) => {
          this.authors$.next(response.data);
          return response.data;
        })
      );
  }
}
