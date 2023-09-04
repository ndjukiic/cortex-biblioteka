import { Component } from '@angular/core';

@Component({
  selector: 'app-librarian-list',
  templateUrl: './librarian-list.component.html',
  styleUrls: ['./librarian-list.component.css']
})
export class LibrarianListComponent {
  dummyData = [
    {
      name: 'John Johnson',
      email: 'john@john.john',
      role: 'Bibliotekar',
      lastSeen: 'Juče',
    },
    {
      name: 'Marko Marković',
      email: 'marko@marko.marko',
      role: 'Bibliotekar',
      lastSeen: 'Prije 2 dana',
    },
    {
      name: 'Janko Janković',
      email: 'janko@janko.janko',
      role: 'Bibliotekar',
      lastSeen: 'Prije 10 dana',
    },
    {
      name: 'Petar Petrović',
      email: 'petar@petar.petar',
      role: 'Bibliotekar',
      lastSeen: 'Juče',
    },
  ];
}
