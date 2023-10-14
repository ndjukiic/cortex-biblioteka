import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiUrl}`;
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {}

  loginUser(user: User) {
    const url = `${this.url}/login`;

    return this.httpClient
      .post<User>(url, user, {
        headers: {
          Authorization: 'Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=',
        },
      })
      .pipe(
        tap((response) => {
          if (response.data.token) {
            user._token = response.data.token;
            localStorage.setItem('token', user._token);
          }
          console.log('Token stored', response.data.token);
        })
      );
  }

  getActiveUser() {
    const url = `${this.url}/users/me`;
    const token = localStorage.getItem('token');
    console.log('Current token: ', localStorage.getItem('token'));

    if (!token) {
      console.log('Token is empty.');
      return null;
    }

    return this.httpClient
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((response: { data }) => {
          this.user$.next(response.data);
          console.log('Currently active user: ', this.user$.value);
        })
      );
  }
}
