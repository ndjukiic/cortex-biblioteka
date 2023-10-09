import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { environment } from 'src/environments/environment';
import { BorrowedBook } from '../models/borrowed-book.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private url = `${environment.apiUrl}/books`;
  public borrowedBooks$ = new Subject();

  constructor(private httpClient: HttpClient) {}

  loadBorrowedBooks(): Observable<BorrowedBook[]> {
    return this.httpClient
      .get(`${this.url}/borrows`, {
        headers: {
          Authorization: 'Bearer 12|NFCVzmhvScnV49j6EsXXcH6ErxYuMEsMWHLSOsPD',
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
}
