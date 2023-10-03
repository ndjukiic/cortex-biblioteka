import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService{

  private url = 'https://tim7.petardev.live/api/authors';

  constructor() { }
}
