import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { Librarian } from '../models/librarian.model';
import { LibrarianCreate } from '../models/librarian-create.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  private url = 'https://tim7.petardev.live/api/users';
  public librarians$ = new BehaviorSubject<Librarian[]>(null);
  public librarian$ = new BehaviorSubject<Librarian>(null);

  constructor(private httpClient: HttpClient) {}

  loadLibrarians(): Observable<Librarian[]> {
    return this.httpClient
      .get(this.url, {
        headers: {
          Authorization: 'Bearer 8|sV25Lac7JJ10WvWztDgufeycIoiEuEhsi1rcGnKw',
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

  loadLibrarian(id: number): Observable<Librarian> {
    return this.httpClient
      .get<ApiResponse<Librarian>>(`${this.url}/${id}`, {
        headers: {
          Authorization: 'Bearer 8|sV25Lac7JJ10WvWztDgufeycIoiEuEhsi1rcGnKw',
        },
      })
      .pipe(
        map((response: ApiResponse<Librarian>) => {
          this.librarian$.next(response.data);
          return response.data;
        })
      );
  }

  createNewLibrarian(librarian: LibrarianCreate): Observable<any> {
    return this.httpClient.post(`${this.url}/store`, librarian, {
      headers: {
        Authorization: 'Bearer 8|sV25Lac7JJ10WvWztDgufeycIoiEuEhsi1rcGnKw',
      },
    });
  }

  editLibrarian(librarian: LibrarianCreate, id: number): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, librarian, {
      headers: {
        Authorization: 'Bearer 8|sV25Lac7JJ10WvWztDgufeycIoiEuEhsi1rcGnKw',
      },
    });
  }

  saveLibrarian(
    librarianForm: FormGroup,
    librarianId: number | null = null
  ): Observable<any> {
    if (!librarianForm.valid) {
      return throwError(() => new Error('Forma nije validna'));
    }
  
    const nameAndSurname = librarianForm.get('nameAndSurname').value;
    const fullName = nameAndSurname.split(/\s(.+)/);
    const name = fullName[0];
    const surname = fullName[1];
  
    const librarianData: LibrarianCreate = {
      role_id: 1,
      name: name,
      surname: surname,
      jmbg: librarianForm.get('jmbg').value,
      email: librarianForm.get('email').value,
      username: librarianForm.get('username').value,
      password: librarianForm.get('password').value,
      password_confirmation: librarianForm.get('confirmPassword').value,
    };
  
    if (librarianId) {
      return this.editLibrarian(librarianData, librarianId).pipe(
        tap(() => {
          this.loadLibrarians();
          librarianForm.reset();
        })
      );
    } else {
      return this.createNewLibrarian(librarianData).pipe(
        tap(() => {
          this.loadLibrarians();
          librarianForm.reset();
        })
      );
    }
  }
  
}
