import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getActiveUser().subscribe(
      (response) => {},
      (error) => {
        console.log("There's no logged in users right now.");
      }
    );
  }
}
