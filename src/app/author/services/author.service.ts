import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/author.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private url = `${environment.apiUrl}/authors`;
  private authors$ = new Subject<Author[]>();
  private author$ = new Subject<Author>();

  private authorId: number;

  constructor(private httpClient: HttpClient) {}

  loadAuthors(): Observable<Author[]> {
    return this.httpClient
      .get<ApiResponse<Author[]>>(this.url, {
        headers: {
          Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',
        },
      })
      .pipe(
        map((response: ApiResponse<Author[]>) => {
          this.authors$.next(response.data);
          return response.data;
        })
      );
  }

  loadAuthor(id: number): Observable<Author> {
    const url = `${this.url}/${id}`;
    return this.httpClient
      .get(url, {
        headers: {
          Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',
          
        },
      })
      .pipe(
        map((response: ApiResponse<Author>) => {
          this.author$.next(response.data);
          return response.data;
        })
      );
  }

  addAuthor(author: Author) {
    return this.httpClient
      .post<Author>(`${this.url}/store`, author, {
        headers: {
          Authorization: 'Bearer 17|827YV4ILOjtMqDtWHl9WkhmHAwwDoLR4N9F7T9kC',
        },
      })
      .pipe(
        tap((response: Author) => {
          console.log('succesfully created', response);
        })
      );
  }

  getBookID() {
    return this.authorId;
  }

  setAuthorId(id: number) {
    this.authorId = id;
  }

  deleteAuthor(authorId: number) {
    const url = `your_api_url/authors/${authorId}`; // Replace with your API endpoint
    return this.httpClient.delete(url);
  }
}
