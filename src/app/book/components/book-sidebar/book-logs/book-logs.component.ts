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
      console.log(this.allActivities)

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
