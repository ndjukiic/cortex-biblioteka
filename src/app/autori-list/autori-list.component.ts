import { Component } from '@angular/core';

@Component({
  selector: 'app-autori-list',
  templateUrl: './autori-list.component.html',
  styleUrls: ['./autori-list.component.css'],
})
export class AutoriListComponent {
  lipsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";

  dummyData = [
    {
      ime: 'Albert Kami',
      opis: this.lipsum,
    },
    {
      ime: 'Johan Volfgang Gete',
      opis: this.lipsum,
    },
    {
      ime: 'Ivo Andrić',
      opis: this.lipsum,
    },
    {
      ime: 'Desanka Maksimović',
      opis: this.lipsum,
    },
  ];
}
