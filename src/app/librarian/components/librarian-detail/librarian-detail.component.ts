import { Component, OnInit } from '@angular/core';
import { Librarian } from '../../models/librarian.model';
import { LibrarianService } from '../../services/librarian.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-librarian-detail',
  templateUrl: './librarian-detail.component.html',
  styleUrls: ['./librarian-detail.component.css'],
})
export class LibrarianDetailComponent implements OnInit {
  librarian: Librarian;

  constructor(
    private route: ActivatedRoute,
    private librarianService: LibrarianService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.librarianService
      .loadLibrarian(id)
      .subscribe((librarian: Librarian) => {
        this.librarian = librarian;
      });
  }
}
