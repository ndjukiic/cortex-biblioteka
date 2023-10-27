import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-dashboard-activities',
  templateUrl: './dashboard-activities.component.html',
})
export class DashboardActivitiesComponent implements OnInit {
  activeReservations;
  allActivities;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllActivities().subscribe((response) => {
      this.allActivities = [
        ...response.data.izdate,
        ...response.data.otpisane,
        ...response.data.vracene,
      ];

      this.sortActivities();
    });
  }

  sortActivities() {
    this.allActivities.sort((a, b) => {
      const formatDateA = new Date(a.action_date);
      const formatDateB = new Date(b.action_date);

      const dateA = formatDateA.getTime();
      const dateB = formatDateB.getTime();

      return dateB - dateA;
    });

    console.log('post sort', this.allActivities);
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
