import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiUrl}`;
  public user$ = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {}

  loginUser(user: User) {
    const url = `${this.url}/login`;

    return this.httpClient
      .post(url, user, {
        headers: {
          Authorization: 'Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=',
        },
      })
      .pipe(
        tap((response: { data }) => {
          if (response.data.token) {
            this.user$.next(response.data);
            localStorage.setItem('token', response.data.token);
          }
        })
      );
  }

  getActiveUser(): Observable<boolean> {
    const url = `${this.url}/users/me`;
    const token = localStorage.getItem('token');

    if (!token) {
      return of(false);
    }

    return this.httpClient
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response: { data }) => {
          this.user$.next(response.data);
          return true;
        })
      );
  }
}
