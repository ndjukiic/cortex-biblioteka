import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {

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
