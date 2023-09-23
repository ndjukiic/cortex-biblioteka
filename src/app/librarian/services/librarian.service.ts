import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { Librarian } from '../models/librarian.model';
import { LibrarianCreate } from '../models/librarian-create.model';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  private url = 'https://tim7.petardev.live/api/users';
  public librarians$ = new Subject<Librarian[]>();
  public librarian$ = new Subject<Librarian>();

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

  loadLibrarian(id: number): Observable<Librarian> {
    return this.httpClient
      .get<ApiResponse<Librarian>>(`${this.url}/${id}`, {
        headers: {
          Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
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
        Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
      },
    });
  }

  editLibrarian(librarian: LibrarianCreate, id: number): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, librarian, {
      headers: {
        Authorization: 'Bearer 4|pzbRL3SYZGbepvDMNH5k1VL6rJtK2TTfNqnovn1H',
      },
    });
  }

  createLibrarianForm() {
    return new FormGroup({
      nameAndSurname: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        this.minTwoWords,
      ]),
      userType: new FormControl({ value: 'Bibliotekar', disabled: true }),
      jmbg: new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_-]+$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.passwordMatch,
      ]),
      userImage: new FormControl(null),
    });
  }

  saveOrEditLibrarian(
    librarianForm: FormGroup,
    librarianId: number | null = null
  ): Observable<any> {
    if (librarianForm.valid) {
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
    } else {
      return throwError(() => new Error('Forma nije validna'));
    }
  }

  minTwoWords(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return null;
    }
    const words = control.value
      .split(' ')
      .filter((word: string) => word.trim() != '');
    if (words.length < 2) {
      return { minimumTwoWords: true };
    }
    return null;
  }

  passwordMatch(control: AbstractControl): { [s: string]: boolean } | null {
    if (
      !control.parent ||
      !control.parent.get('password') ||
      !control.parent.get('confirmPassword')
    ) {
      return null;
    }
    const formGroup = control.parent as FormGroup;
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
