import { Component } from '@angular/core';

@Component({
  selector: 'app-book-top-bar',
  templateUrl: './book-top-bar.component.html',
  styleUrls: ['./book-top-bar.component.css']
})
export class BookTopBarComponent {
  dummyData = [
    {
      name: 'Tom Sojer'
    },
  ];
}
