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
  }

  getDaysAgo(action_date: string) {
    const reservationDate = new Date(action_date);
    let interval: number;

    const ms = Date.now() - Number(reservationDate);

    if (Date().includes('GMT+0100')) {
      interval = ms - 3600000;
    } else {
      interval = ms;
    }

    let time = this.msRoundup(interval);

    return time;
  }

  formatDate(action_date: string) {
    const formattedDate = action_date.split(' ')[0].split('-');
    const day = formattedDate[2];
    const month = formattedDate[1];
    const year = formattedDate[0];

    const fullDate = `${day}.${month}.${year}`;

    return fullDate;
  }

  msRoundup(ms: number) {
    if (ms >= 2629800000) {
      let interval = Math.round(ms / (1000 * 60 * 60 * 24 * 30));
      if (interval % 10 == 1) {
        return `prije ${interval} mjesec`;
      }
      if (interval % 10 == 2 || interval % 10 == 3 || interval % 10 == 4) {
        return `prije ${interval} mjeseca`;
      }
      if (
        interval % 10 == 5 ||
        interval % 10 == 6 ||
        interval % 10 == 7 ||
        interval % 10 == 8 ||
        interval % 10 == 9
      ) {
        return `prije ${interval} mjeseci`;
      }
    } else if (ms >= 86400000) {
      //if days
      let interval = Math.round(ms / (1000 * 60 * 60 * 24));
      if (interval % 10 !== 1) {
        return `prije ${interval} dana`;
      }
      return `${interval} dan`;
    } else if (ms >= 3600000) {
      //if hours
      let interval = Math.round(ms / (1000 * 60 * 60));
      if (interval % 10 == 1) {
        return `prije ${interval} sat`;
      }
      if (interval % 10 == 2 || interval % 10 == 3 || interval % 10 == 4) {
        return `prije ${interval} sata`;
      }
      if (
        interval % 10 == 5 ||
        interval % 10 == 6 ||
        interval % 10 == 7 ||
        interval % 10 == 8 ||
        interval % 10 == 9
      ) {
        return `prije ${interval} sati`;
      }
    } else if (ms >= 60000) {
      //if minutes
      let interval = Math.round(ms / (1000 * 60));
      if (interval % 10 !== 1) {
        return `prije ${interval} minuta`;
      }
      return `${interval} minut`;
    } else if (ms >= 1000) {
      //if seconds
      let interval = Math.round(ms / 1000);
      if (interval % 10 == 1) {
        return `prije ${interval} sekundu`;
      }
      if (interval % 10 == 2 || interval % 10 == 3 || interval % 10 == 4) {
        return `prije ${interval} sekunde`;
      }
      if (
        interval % 10 == 5 ||
        interval % 10 == 6 ||
        interval % 10 == 7 ||
        interval % 10 == 8 ||
        interval % 10 == 9
      ) {
        return `prije ${interval} sekundi`;
      }
    }
  }
}
