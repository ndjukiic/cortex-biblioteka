import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrarianService } from '../../services/librarian.service';

@Component({
  selector: 'app-librarian-add',
  templateUrl: './librarian-add.component.html',
  styleUrls: ['./librarian-add.component.css']
})
export class LibrarianAddComponent  implements OnInit {
  librarianAddForm: FormGroup;

  constructor(private librarianService: LibrarianService, private router: Router) {}

  ngOnInit(): void {
    this.librarianAddForm = this.librarianService.createLibrarianForm();
  }

  onSubmit() {
    this.librarianService
      .saveOrEditLibrarian(this.librarianAddForm)
      .subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.router.navigate(['/librarians']);
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
  }

  onCancel() {
    this.router.navigate(['/librarians']);
  }
}
