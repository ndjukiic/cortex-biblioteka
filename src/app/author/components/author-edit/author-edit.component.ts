import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { createAuthorForm } from '../../helpers/author-edit.helper';


@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent {
 
  author: Author;
  authorToEdit: Author;
  authorEditForm: FormGroup;

  constructor(
    private authorService: AuthorService,
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authorEditForm = createAuthorForm();
    const authorId = +this.route.snapshot.paramMap.get('id');
    this.authorService.loadAuthor(authorId).subscribe((author: Author) => {
      this.author = author;

      this.authorEditForm.patchValue({
        'nameAndSurname': author.name + ' ' + author.surname,
      });
    });
  }
    

  onSubmit(){
   
    
    this.authorService
      .saveAuthor(this.authorEditForm, this.author.id)
      .subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.router.navigate(['../details'], { relativeTo: this.route });
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  


  lipsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
}
