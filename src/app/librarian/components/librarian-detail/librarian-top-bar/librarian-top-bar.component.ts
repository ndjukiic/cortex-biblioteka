import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Librarian } from 'src/app/librarian/models/librarian.model';
import { LibrarianService } from 'src/app/librarian/services/librarian.service';

@Component({
  selector: 'app-librarian-top-bar',
  templateUrl: './librarian-top-bar.component.html',
  styleUrls: ['./librarian-top-bar.component.css'],
})
export class LibrarianTopBarComponent {
  @Input() librarian: Librarian;

  constructor(
    private librarianService: LibrarianService,
    private router: Router
  ) {}

  deleteLibrarian() {
    const confirmation = window.confirm(
      `Da li ste sigurni da želite da izbrišete korisnika ${this.librarian?.name} ${this.librarian?.surname}?`
    );

    if (confirmation) {
      this.librarianService.deleteLibrarian(this.librarian.id).subscribe(() => {
        this.router.navigate(['/librarians']);
      });
    }
  }
}
