import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ucenici-list',
  templateUrl: './ucenici-list.component.html',
  styleUrls: ['./ucenici-list.component.css']
})
export class UceniciListComponent{
  dummyData = [
    {
      name: 'John Johnson',
      email: 'john@john.john',
      tip: 'Učenik',
      pristup: 'Juče'
    },    
    {
      name: 'Drugo Ime',
      email: 'test2@john.john',
      tip: 'Učenik',
      pristup: 'Juče'
    }
  ];
}
