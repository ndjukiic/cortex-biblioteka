import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book.model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  tap,
  throwError,
} from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = `${environment.apiUrl}/books`;
  private books$ = new Subject<Book[]>();
  private book$ = new Subject<Book>();
  private bookID: number;
  private activityID: number;
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

  addBook(bookData: any): Observable<any> {
    if (!bookData) {
      return throwError(() => new Error('Nema dostupnih podataka za knjigu'));
    }
    return this.httpClient.post<Book>(`${this.url}/store`, bookData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
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

  dismissBook(id: number) {
    //push request for otpisi book
    const url = `${this.url}/otpisi`;
    const body = {
      toWriteoff: [id],
    };

    return this.httpClient
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap(
          (response) => {
            console.log('successfull dismission!', response);
            alert('Uspješno otpisana knjiga');
          },
          (error) => {
            console.log('unsuccessful dismission', error.error);
            alert('Greška!' + error.data.errors + ' Molimo pokušajte ponovo.');
          }
        )
      );
  }

  getAllActivities() {
    const url = `${this.url}/borrows`;

    return this.httpClient
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response: { data }) => {
          console.log('it worked', response.data);
        })
      );
  }

  getAllBookActivities(id: number) {
    const url = `${this.url}/borrows?book_id=${id}`;

    return this.httpClient
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response: { data }) => {
          console.log('successfull get request!', response.data);
        })
      );
  }

  getAllBookProperties() {
    const url = `${this.url}/create`;

    return this.httpClient
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((response: { data }) => {}));
  }

  setBookID(id: number) {
    this.bookID = id;
  }

  getBookID() {
    return this.bookID;
  }

  setActivityID(id: number) {
    this.activityID = id;
  }

  getActivityID() {
    return this.activityID;
  }

  msRoundup(ms: number) {
    if (ms >= 2629800000) {
      let interval = Math.round(ms / (1000 * 60 * 60 * 24 * 30));
      if (interval % 10 == 1) {
        return `${interval} mjesec`;
      }
      if (interval % 10 == 2 || interval % 10 == 3 || interval % 10 == 4) {
        return `${interval} mjeseca`;
      }
      if (
        interval % 10 == 5 ||
        interval % 10 == 6 ||
        interval % 10 == 7 ||
        interval % 10 == 8 ||
        interval % 10 == 9
      ) {
        return `${interval} mjeseci`;
      }
    } else if (ms >= 86400000) {
      //if days
      let interval = Math.round(ms / (1000 * 60 * 60 * 24));
      if (interval % 10 !== 1) {
        return `${interval} dana`;
      }
      return `${interval} dan`;
    } else if (ms >= 3600000) {
      //if hours
      let interval = Math.round(ms / (1000 * 60 * 60));
      if (interval % 10 == 1) {
        return `${interval} sat`;
      }
      if (interval % 10 == 2 || interval % 10 == 3 || interval % 10 == 4) {
        return `${interval} sata`;
      }
      if (
        interval % 10 == 5 ||
        interval % 10 == 6 ||
        interval % 10 == 7 ||
        interval % 10 == 8 ||
        interval % 10 == 9
      ) {
        return `${interval} sati`;
      }
    } else if (ms >= 60000) {
      //if minutes
      let interval = Math.round(ms / (1000 * 60));
      if (interval % 10 !== 1) {
        return `${interval} minuta`;
      }
      return `${interval} minut`;
    } else if (ms >= 1000) {
      //if seconds
      let interval = Math.round(ms / 1000);
      if (interval % 10 == 1) {
        return `${interval} sekundu`;
      }
      if (interval % 10 == 2 || interval % 10 == 3 || interval % 10 == 4) {
        return `${interval} sekunde`;
      }
      if (
        interval % 10 == 5 ||
        interval % 10 == 6 ||
        interval % 10 == 7 ||
        interval % 10 == 8 ||
        interval % 10 == 9
      ) {
        return `${interval} sekundi`;
      }
    }
  }

  msInDays(ms: number){
    if (ms >= 86400000) {
      //if days
      let interval = Math.round(ms / (1000 * 60 * 60 * 24));
      if (interval % 10 !== 1) {
        return `${interval} dana`;
      }
      return `${interval} dan`;
    }
  }
}
