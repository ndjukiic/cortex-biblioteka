import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-logs-detailed',
  templateUrl: './book-logs-detailed.component.html',
})
export class BookLogsDetailedComponent implements OnInit {
  private id: number;
  private len: number;
  allActivities;
  activity;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((route) => {
      this.id = route.id;
    });

    this.bookService.getAllActivities().subscribe((response) => {
      this.allActivities = [
        ...response.data.izdate,
        ...response.data.otpisane,
        ...response.data.vracene,
      ];
      this.len = this.allActivities.length;
      this.extractActivity();
    });
  }

  extractActivity() {
    for (let i = 0; i < this.len; i++) {
      if ((this.allActivities[i].id = this.id)) {
        this.activity = this.allActivities[i];
        break;
      } else {
      }
    }
  }

  formatDate(action_date: string) {
    const formattedDate = action_date.split(' ')[0].split('-');
    const day = formattedDate[2];
    const month = formattedDate[1];
    const year = formattedDate[0];

    const fullDate = `${day}.${month}.${year}`;

    return fullDate;
  }

  currentRetention(action_date: string) {
    //1296000000
    const reservationDate = new Date(action_date);
    let interval: number;
    let time: string;

    const ms = Date.now() - Number(reservationDate);

    if (Date().includes('GMT+0100')) {
      interval = ms - 3600000;
    } else {
      interval = ms;
    }

    if (interval > 1296000000) {
      time = this.bookService.msInDays(interval);
    } else {
      return;
    }

    return time;
  }

  checkTransgression(action_date: string) {
    let time = this.currentRetention(action_date);
    let splitResult = time.split(' ');
    if (Number(splitResult[0]) > 15) {
      return Number(splitResult[0]) - 15 + ' dan(a)';
    } else {
      return 'Nema prekoračenja';
    }
  }
}
