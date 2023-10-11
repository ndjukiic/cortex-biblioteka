import { Component, OnInit } from '@angular/core';
import { ActiveUserProvider } from './auth/services/active-user.provider';
import { AuthService } from './auth/services/auth.service';
import { Book } from './book/models/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cortex-biblioteka';
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((response) => {
      if (!response) {
        this.isLoggedIn = false;
      } else if (response) {
        this.isLoggedIn = true;
      }
    });
  }
}
