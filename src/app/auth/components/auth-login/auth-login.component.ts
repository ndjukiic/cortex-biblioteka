import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
})
export class AuthLoginComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
      device: new FormControl('DivajsNejm'),
    });
  }
  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = this.loginForm.value;
    this.authService.loginUser(user).subscribe(
      (apiResponse) => {
        alert('Uspješno ste se ulogovali u aplikaciju.');
        console.log('success!', apiResponse)
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
