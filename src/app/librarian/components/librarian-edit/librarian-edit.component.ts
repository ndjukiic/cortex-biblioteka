import { Component, OnInit } from '@angular/core';
import { Librarian } from '../../models/librarian.model';
import { LibrarianService } from '../../services/librarian.service';
import { FormGroup } from '@angular/forms';
import { LibrarianCreate } from '../../models/librarian-create.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-librarian-edit',
  templateUrl: './librarian-edit.component.html',
  styleUrls: ['./librarian-edit.component.css'],
})
export class LibrarianEditComponent implements OnInit {
  
  librarian: Librarian;
  librarianEditForm: FormGroup;

  constructor(private librarianService: LibrarianService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const librarianId = +this.route.snapshot.paramMap.get('id');
    this.librarianService.loadLibrarian(librarianId).subscribe((librarian: Librarian) => {
      this.librarian = librarian;
      
      this.librarianEditForm.patchValue({
        'nameAndSurname': librarian.name + ' ' + librarian.surname,
        'jmbg': librarian.jmbg,
        'email': librarian.email,
        'username': librarian.username,
      });
    });
    
    this.librarianEditForm = this.librarianService.createLibrarianForm();
  }
  
  onSubmit() {
    this.librarianService
      .saveOrEditLibrarian(this.librarianEditForm, this.librarian.id)
      .subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
