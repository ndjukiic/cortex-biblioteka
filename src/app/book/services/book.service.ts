import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = 'https://tim7.petardev.live/api/books';
  private books$ = new Subject<Book[]>();
  private book$ = new Subject<Book>();
  private bookID: number;

  constructor(private httpClient: HttpClient) {}

  loadBooks(): Observable<Book[]> {
    return this.httpClient
      .get<ApiResponse<Book[]>>(this.url, {
        headers: {
          Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',
        },
      })
      .pipe(
        map((response: ApiResponse<Book[]>) => {
          this.books$.next(response.data);
          return response.data;
        })
      );
  }

  loadBook(id: number): Observable<Book> {
    const url = `${this.url}/${id}`;
    return this.httpClient
      .get(url, {
        headers: {
          Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',
        },
      })
      .pipe(
        map((response: ApiResponse<Book>) => {
          this.book$.next(response.data);
          return response.data;
        })
      );
  }

  loadBookForEdit(id: number): Observable<Book>{
    const url = `${this.url}/${id}/edit`
    
    return this.httpClient.get(url,{ headers: {
      Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',}}
      ).pipe(
        map((response: ApiResponse<Book>)=>{
          this.book$.next(response.data);
          return response.data;
        })
      )
  }

  addBook(book: Book) {
    return this.httpClient
      .post<Book>(`${this.url}/store`, book, {
        headers: {
          Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',
        },
      })
      .pipe(
        tap((response: Book) => {
          console.log('succesfully created', response);
        })
      );
  }

  setBookID(id: number) {
    this.bookID = id;
  }

  getBookID() {
    return this.bookID;
  }
}
