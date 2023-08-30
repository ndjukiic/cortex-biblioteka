import { Component } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

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
    {
      name: 'knjiga2',
      author: 'Mark Whalberg',
      category: 'Epika',
      available: 89,
      booked: 2,
      issued: 39,
      exceeded: 5,
      totalCopies: 135
    },
  ];
}
