import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-logs',
  templateUrl: './book-logs.component.html',
})
export class BookLogsComponent implements OnInit {
  id: number;
  allActivities;
  isNull = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.id = this.bookService.getBookID();

    this.bookService.getAllBookActivities(this.id).subscribe((response) => {
      this.allActivities = [
        ...response.data.izdate,
        ...response.data.otpisane,
        ...response.data.vracene,
      ];

      if (!this.allActivities.length) {
        this.isNull = true;
      }

      this.sortAndSlice();
    });
  }

  sortAndSlice() {
    this.allActivities.sort((a, b) => {
      const formatDateA = new Date(a.action_date);
      const formatDateB = new Date(b.action_date);

      const dateA = formatDateA.getTime();
      const dateB = formatDateB.getTime();

      return dateB - dateA;
    });

    this.allActivities = this.allActivities.slice(0, 3);
  }

  getDaysAgo(action_date: string) {
    const reservationDate = new Date(action_date);

    const ms = Date.now() - Number(reservationDate);
    let time = this.msRoundup(ms);

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
