import { Component, Input } from '@angular/core';
import { Librarian } from 'src/app/librarian/models/librarian.model';

@Component({
  selector: 'app-librarian-top-bar',
  templateUrl: './librarian-top-bar.component.html',
  styleUrls: ['./librarian-top-bar.component.css']
})
export class LibrarianTopBarComponent {

  @Input() librarian: Librarian;
}
