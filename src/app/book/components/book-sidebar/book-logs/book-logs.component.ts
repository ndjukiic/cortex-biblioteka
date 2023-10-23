import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-book-logs',
  templateUrl: './book-logs.component.html',
})
export class BookLogsComponent implements OnInit {
  id: number;
  activeReservations;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.id = this.bookService.getBookID();

    this.bookService.getActiveReservations(this.id).subscribe((response) => {
      this.activeReservations = response.data.active.reverse().slice(0, 3);
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
