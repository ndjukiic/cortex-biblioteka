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
          this.user$.next(user);
        })
      );
  }
}
