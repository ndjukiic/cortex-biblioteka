import { Component } from '@angular/core';

@Component({
  selector: 'app-knjige-list',
  templateUrl: './knjige-list.component.html',
  styleUrls: ['./knjige-list.component.css']
})
export class KnjigeListComponent {

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
