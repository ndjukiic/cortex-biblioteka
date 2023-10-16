import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent {
 
  @Output() formEmitter = new EventEmitter<Author>();
  authorToEdit: Author;
  id: number;
  authorEditForm: FormGroup;

  ngOnInit(): void {
    this.authorEditForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'biography': new FormControl(null)
    });
  }

  onSubmit(){
   
  }

  author: Author = {
    id: 1,
    name: 'Ivo',
    surname: 'Andric',
    biography: 'A brief biography...',
    image: 'author-image.jpg',
  };
  // author: Author;

  lipsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
}
