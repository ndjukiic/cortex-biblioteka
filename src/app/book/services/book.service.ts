import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = `${environment.apiUrl}/books`;
  private books$ = new Subject<Book[]>();
  private book$ = new Subject<Book>();
  private bookID: number;
  public currentBook$ = new BehaviorSubject<Book>(null);

  constructor(private httpClient: HttpClient) {}

  loadBooks(): Observable<Book[]> {
    return this.httpClient
      .get<ApiResponse<Book[]>>(this.url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((response: ApiResponse<Book>) => {
          this.currentBook$.next(response.data);
          return response.data;
        })
      );
  }

  loadBookForEdit(id: number): Observable<Book> {
    const url = `${this.url}/${id}/edit`;

    return this.httpClient
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        map((response: ApiResponse<Book>) => {
          this.book$.next(response.data);
          return response.data;
        })
      );
  }

  addBook(book: Book) {
    return this.httpClient
      .post<Book>(`${this.url}/store`, book, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((response: Book) => {
          console.log('succesfully created', response);
        })
      );
  }

  editBook(book: Book, id: number) {
    const url = `${this.url}/${id}/update`;

    return this.httpClient
      .post(url, book, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((response) => {
          console.log('successfully edited', response);
        })
      );
  }

  deleteBook(id: number) {
    const url = `${this.url}/${id}/destroy`;

    return this.httpClient.delete(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  reserveBook(body: any, id: number) {
    const url = `${this.url}/${id}/reserve`;

    return this.httpClient
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap(
          (response) => {
            console.log(response);
            alert('Uspješno izdata knjiga');
          },
          (error) => {
            if (error.data.errors) {
              alert('Greška!' + error.data.errors);
            } else if (!error.data.errors) {
              alert('Greška! ' + error.error.errors);
            }
          }
        )
      );
  }

  
 

  dismissBook() {
    //push request for otpisi book
  }

  getActiveReservations(id?: number) {
    let url = `${this.url}/reservations`;
    if (id) {
      url = `${this.url}/reservations?book_id=${id}`;
    }

    return this.httpClient
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response: { data }) => {
          console.log('Active reservations: ', response.data.active);
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
