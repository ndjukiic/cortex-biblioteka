import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { environment } from 'src/environments/environment';
import { BorrowedBook } from '../models/borrowed-book.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private url = `${environment.apiUrl}/books`;
  public borrowedBooks$ = new Subject();
  public returnedBooks$ = new Subject();
  public overdueBooks$ = new Subject();
  public activeReservations$ = new Subject();
  public archivedReservations$ = new Subject();

  constructor(private httpClient: HttpClient) {}

  loadBorrowedBooks(bookId?: number): Observable<BorrowedBook[]> {
    const requestBody = bookId ? { book_id: bookId } : {};
    return this.httpClient
      .get(`${this.url}/borrows`, {
        params: requestBody,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((response: ApiResponse<any>) => {
          const borrowedOnly = response.data.izdate;
          this.borrowedBooks$.next(borrowedOnly);
          return borrowedOnly;
        })
      );
  }

  loadReturnedBooks(bookId?: number): Observable<BorrowedBook[]> {
    const requestBody = bookId ? { book_id: bookId } : {};
    return this.httpClient
      .get(`${this.url}/borrows`, {
        params: requestBody,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((response: ApiResponse<any>) => {
          const returnedOnly = response.data.vracene;
          this.returnedBooks$.next(returnedOnly);
          return returnedOnly;
        })
      );
  }

  loadOverdueBooks(bookId?: number): Observable<BorrowedBook[]> {
    const requestBody = bookId ? { book_id: bookId } : {};
    return this.httpClient
      .get(`${this.url}/borrows`, {
        params: requestBody,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((response: ApiResponse<any>) => {
          const overdueOnly = response.data.prekoracene;
          this.overdueBooks$.next(overdueOnly);
          return overdueOnly;
        })
      );
  }

  loadActiveReservations(bookId?: number): Observable<BorrowedBook[]> {
    const requestBody = bookId ? { book_id: bookId } : {};
    return this.httpClient
      .get(`${this.url}/reservations`, {
        params: requestBody,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((response: ApiResponse<any>) => {
          const activeOnly = response.data.active;
          this.activeReservations$.next(activeOnly);
          return activeOnly;
        })
      );
  }

  loadArchivedReservations(bookId?: number): Observable<BorrowedBook[]> {
    const requestBody = bookId ? { book_id: bookId } : {};
    return this.httpClient
      .get(`${this.url}/reservations`, {
        params: requestBody,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((response: ApiResponse<any>) => {
          const archivedOnly = response.data.archive;
          this.archivedReservations$.next(archivedOnly);
          return archivedOnly;
        })
      );
  }
}
