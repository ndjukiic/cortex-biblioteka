import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-dismiss',
  templateUrl: './book-dismiss.component.html',
})
export class BookDismissComponent implements OnInit {
  expiredReservations;
  checkboxItemContainer;
  id: number;

  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.bookService.getBookID();

    this.bookService.getAllBookActivities(this.id).subscribe((response) => {
      this.expiredReservations = response.data.prekoracene;
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

  onConfirm() {
    if(!this.checkboxItemContainer){
      return 
    }
    this.bookService.dismissBook(this.checkboxItemContainer.id).subscribe(
      (response)=>{
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    );
  }

  onSingleCheckboxChange(item) {
    this.checkboxItemContainer = item;
    console.log(this.checkboxItemContainer);
  }

  onAllCheckboxChange(expiredReservations) {
    console.log('svi su odabrani');
  }
}
