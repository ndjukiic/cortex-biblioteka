import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrarianService } from '../../services/librarian.service';
import { LibrarianCreate } from '../../models/librarian-create.model';

@Component({
  selector: 'app-librarian-add',
  templateUrl: './librarian-add.component.html',
  styleUrls: ['./librarian-add.component.css']
})
export class LibrarianAddComponent  implements OnInit {
  librarianAddForm: FormGroup;

  constructor(private librarianService: LibrarianService, private router: Router) {}

  ngOnInit(): void {
    this.librarianAddForm = new FormGroup({
      'nameAndSurname': new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), this.minTwoWords]),
      'userType': new FormControl({ value: 'Bibliotekar', disabled: true }),
      'jmbg': new FormControl(null, [Validators.required, Validators.minLength(13)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_-]+$/)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required, this.passwordMatch]),
      'userImage': new FormControl(null)
    })
  }

  onSubmit() {
    if (this.librarianAddForm.valid) {
      const nameAndSurname = this.librarianAddForm.get('nameAndSurname').value;
      const fullName = nameAndSurname.split(/\s(.+)/);
      const name = fullName[0];
      const surname = fullName[1];

      const librarianData: LibrarianCreate = {
        role_id: 1,
        name: name,
        surname: surname,
        jmbg: this.librarianAddForm.get('jmbg').value,
        email: this.librarianAddForm.get('email').value,
        username: this.librarianAddForm.get('username').value,
        password: this.librarianAddForm.get('password').value,
        password_confirmation: this.librarianAddForm.get('confirmPassword').value,
      };

      this.librarianService.createNewLibrarian(librarianData).subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.librarianService.loadLibrarians();
          this.librarianAddForm.reset();
          this.router.navigate(['/librarians']);
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/librarians']);
  }

  minTwoWords(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return null;
    }
    const words = control.value
      .split(' ')
      .filter((word: string) => word.trim() != '');
    if (words.length < 2) {
      return { minimumTwoWords: true };
    }
    return null;
  }

  passwordMatch(control: AbstractControl): { [s: string]: boolean } | null {
    if (
      !control.parent ||
      !control.parent.get('password') ||
      !control.parent.get('confirmPassword')
    ) {
      return null;
    }
    const formGroup = control.parent as FormGroup;
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  } 
}
