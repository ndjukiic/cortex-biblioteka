import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';

const routes = [
    {
        //authlogin as a temp landing component
        path: '',
        component: AuthLoginComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})

export class AuthRoutingModule {}
