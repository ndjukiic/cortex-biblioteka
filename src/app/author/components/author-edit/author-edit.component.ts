import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent {
 
  @Output() formEmitter = new EventEmitter<Author>();

  author: Author;
  authorToEdit: Author;
  authorEditForm: FormGroup;

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    
  }
    

  initEdit(){
    this.authorEditForm = new FormGroup({
      name: new FormControl(this.authorToEdit.name),
      // surname: new FormControl(this.authorEditForm.surname),
      biography: new FormControl(this.authorToEdit.biography)
    })
  }

  onSubmit(){
    this.initEdit();
    console.log("test");
    this.storeToParent();
  }

  storeToParent() {
    this.formEmitter.emit(this.authorEditForm.value);
  }


  lipsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
}
