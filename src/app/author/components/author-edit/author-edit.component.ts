import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent {
  authorAddForm: FormGroup;

  ngOnInit(): void {
    this.authorAddForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'biography': new FormControl(null)
    });
  }

  onSubmit(){
    console.log(this.authorAddForm);
  }
}
