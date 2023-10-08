import { NgModule } from '@angular/core';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [CommonModule, AuthRoutingModule, RouterModule],
})
export class AuthModule {}
