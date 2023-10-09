import { NgModule } from '@angular/core';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthModule {}
