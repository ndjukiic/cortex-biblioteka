import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/author.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService{

  private url = 'https://tim7.petardev.live/api/authors';
  private authors$ = new Subject<Author[]>();

  constructor(private httpClient: HttpClient) { }

  loadBooks(): Observable<Author[]> {
    return this.httpClient
      .get<ApiResponse<Author[]>>(this.url, {
        headers: {
          Authorization: 'Bearer 2|DyPu5MO2VeAwQoHL8dPCkTFfXzMXkZjnP21pFxiV',
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
