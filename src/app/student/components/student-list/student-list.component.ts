import { Component } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  dummyData = [
    {
      name: 'John Johnson',
      email: 'john@john.john',
      role: 'Učenik',
      lastSeen: 'Juče',
    },
    {
      name: 'Marko Marković',
      email: 'marko@marko.marko',
      role: 'Učenik',
      lastSeen: 'Prije 2 dana',
    },
    {
      name: 'Janko Janković',
      email: 'janko@janko.janko',
      role: 'Učenik',
      lastSeen: 'Prije 10 dana',
    },
    {
      name: 'Petar Petrović',
      email: 'petar@petar.petar',
      role: 'Učenik',
      lastSeen: 'Juče',
    },
  ];
}
