import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {

  authorAddForm: FormGroup;
  newAuthor: Author;

  constructor(
    private authorService: AuthorService, 
    private route: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.authorAddForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'biography': new FormControl(null)
    });
  }

  onSubmit(){
    console.log(this.authorAddForm);
  }


  addBook() {
    this.authorService.addAuthor(this.newAuthor).subscribe(
      (response) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error) => {
        alert(
          'Došlo je do naredne greške: ' +
            error.status +
            ' ' +
            error.statusText +
            '. Molimo Vas pokušajte kasnije, ili kontaktirajte administratore.'
        );
      }
    );
  }
  
}
