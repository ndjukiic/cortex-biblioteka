import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable, Subject, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = 'https://tim7.petardev.live/api/books';
  private books$ = new Subject<Book[]>();
  private book$ = new Subject<Book>();

  constructor(private httpClient: HttpClient) {}

  loadBooks(): Observable<Book[]> {
    return this.httpClient
      .get<ApiResponse<Book[]>>(this.url, {
        headers: {
          Authorization: 'Bearer 2|DyPu5MO2VeAwQoHL8dPCkTFfXzMXkZjnP21pFxiV',
        },
      })
      .pipe(
        map((response: ApiResponse<Book[]>) => {
          this.books$.next(response.data);
          return response.data;
        })
      );
  }

  loadBook(id: number): Observable<Book>{
    const url = `${this.url}/${id}`
    return this.httpClient.get(url, {
      headers: {
        Authorization: 'Bearer 2|DyPu5MO2VeAwQoHL8dPCkTFfXzMXkZjnP21pFxiV',
      }
    }).pipe(
      map(
        (response: ApiResponse<Book>)=>{
          this.book$.next(response.data);
          return response.data
        }
      )
    )
  }
}
