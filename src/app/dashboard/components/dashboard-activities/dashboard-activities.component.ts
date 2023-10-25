import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-dashboard-activities',
  templateUrl: './dashboard-activities.component.html',
})
export class DashboardActivitiesComponent implements OnInit {
  activeReservations;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getActiveReservations().subscribe((response) => {
      this.activeReservations = response.data.active.reverse();
    });
  }
  getDaysAgo(action_date: string) {
    const currentDate = new Date();
    const reservationDate = new Date(action_date);

    const day = currentDate.getDate() - reservationDate.getDate();

    return day;
  }

  formatDate(action_date: string) {
    const formattedDate = action_date.split(' ')[0].split('-');
    const day = formattedDate[2];
    const month = formattedDate[1];
    const year = formattedDate[0];

    const fullDate = `${day}.${month}.${year}`;

    return fullDate;
  }
}
