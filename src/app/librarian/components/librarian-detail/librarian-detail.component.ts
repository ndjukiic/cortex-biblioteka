import { Component } from '@angular/core';
import { Librarian } from '../../models/librarian.model';
import { LibrarianService } from '../../services/librarian.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-librarian-detail',
  templateUrl: './librarian-detail.component.html',
  styleUrls: ['./librarian-detail.component.css']
})
export class LibrarianDetailComponent {

  librarian: Librarian = {
    id: 0,
    role: '',
    jmbg: '',
    photoPath: '',
    username: '',
    name: '',
    surname: '',
    email: '',
  };

  constructor(
    private route: ActivatedRoute,
    private librarianService: LibrarianService
  ) {}

  ngOnInit(): void {
    this.loadLibrarian();
  }

  loadLibrarian() {
    const id = +this.route.snapshot.params['id'];
    this.librarianService.loadLibrarian(id).subscribe({
      next: (librarian: Librarian) => {
        this.librarian = librarian;
      },
      error: (error) => {
        console.error('Greška pri učitavanju bibliotekara', error);
      },
    });
  }
}
