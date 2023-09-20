import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { Librarian } from '../models/librarian.model';
import { LibrarianCreate } from '../models/librarian-create.model';


@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  private url = 'https://tim7.petardev.live/api/users';
  public librarians$ = new Subject<Librarian[]>();

  constructor(private httpClient: HttpClient) {}

  loadLibrarians(): Observable<Librarian[]> {
    return this.httpClient
      .get(this.url, {
        headers: {
          Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
        },
      })
      .pipe(
        map((response: ApiResponse<Librarian[]>) => {
          const librariansOnly = response.data.filter(
            (user) => user.role === 'Bibliotekar'
          );
          this.librarians$.next(librariansOnly);
          return librariansOnly;
        })
      );
  }

  createNewLibrarian(librarian: LibrarianCreate): Observable<any> {
    return this.httpClient.post(`${this.url}/store`, librarian, {
      headers: {
        Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
      },
    });
  }
}
