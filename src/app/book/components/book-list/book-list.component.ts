import { Component } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  dummyData = [
    {
      nazivKnjige: 'knjiga1',
      autor: 'John Johnson',
      kategorija: 'Roman',
      naRaspolaganju: 50,
      rezervisano: 1,
      izdato: 14,
      prekoracenje: 0,
      ukupnaKolicina: 65
    },
    {
      nazivKnjige: 'knjiga2',
      autor: 'Mark Whalberg',
      kategorija: 'Epika',
      naRaspolaganju: 89,
      rezervisano: 2,
      izdato: 39,
      prekoracenje: 5,
      ukupnaKolicina: 135
    },
  ];
}
