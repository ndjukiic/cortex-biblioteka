import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
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
      name: 'Drugo Ime',
      email: 'test2@john.john',
      role: 'Učenik',
      lastSeen: 'Juče',
    },
  ];
}
