import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  studentAddForm: FormGroup;

  ngOnInit(): void {
    this.studentAddForm = new FormGroup({
      'nameAndSurname': new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), this.minTwoWords]),
      'userType': new FormControl({ value: 'Učenik', disabled: true }),
      'jmbg': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_-]+$/)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, [Validators.required, this.passwordMatch]),
      'userImage': new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.studentAddForm);
  }

  minTwoWords(control: FormControl): {[s: string]: boolean} | null {
    if (!control.value) {
      return null;
    }
    const words = control.value.split(' ').filter(word => word.trim() != '');
    if (words.length < 2) {
      return { 'minimumTwoWords': true };
    } 
    return null;
  };

  passwordMatch(control: AbstractControl): { [s: string]: boolean } | null {
    if (!control.parent || !control.parent.get('password') || !control.parent.get('confirmPassword')) {
      return null;
    }
    const formGroup = control.parent as FormGroup;
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
  
    if (password && confirmPassword && password !== confirmPassword) {
      return { 'passwordMismatch': true };
    } 
    return null;
  }
  
  
}
