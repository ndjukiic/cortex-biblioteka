import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-dismiss',
  templateUrl: './book-dismiss.component.html',
})
export class BookDismissComponent implements OnInit {
  dismissMode = true;
  allReservations = [];
  expiredReservations = [];
  id: number;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.id = this.bookService.getBookID();

    this.bookService.getActiveReservations(this.id).subscribe((response) => {
      this.allReservations = response.data.active;
      console.log('post-call', this.allReservations);

      if (this.allReservations) {
        this.checkIfExpired();
      }
    });
  }

  checkIfExpired() {
    let container: number;

    for (let reservation of this.allReservations) {
      container = this.getDaysAgo(reservation.action_date);
      if (container >= 10) {
        this.expiredReservations.push(reservation);
      }
    }
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

  onConfirm(){
    console.log('(ne)uspješno');
  }

}
