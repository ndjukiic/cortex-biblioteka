import { Component } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent {
  dummyData = [
    {
      name: 'knjiga1',
      author: 'John Johnson',
      category: 'Roman',
      available: 50,
      booked: 1,
      issued: 14,
      exceeded: 0,
      totalCopies: 65
    },
  ];
}
