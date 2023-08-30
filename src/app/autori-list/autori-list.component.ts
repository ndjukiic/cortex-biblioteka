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
      name: 'Albert Kami',
      description: this.lipsum,
    },
    {
      name: 'Johan Volfgang Gete',
      description: this.lipsum,
    },
    {
      name: 'Ivo Andrić',
      description: this.lipsum,
    },
    {
      name: 'Desanka Maksimović',
      description: this.lipsum,
    },
  ];
}
