import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UceniciListComponent } from './ucenici-list/ucenici-list.component';
import { KnjigeListComponent } from './knjige-list/knjige-list.component';
import { IzdavanjeComponent } from './izdavanje/izdavanje.component';
import { AutoriListComponent } from './autori-list/autori-list.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'ucenici',
    component: UceniciListComponent,
  },
  {
    path: 'knjige',
    component: KnjigeListComponent,
  },
  {
    path: 'autori',
    component: AutoriListComponent,
  },
  {
    path: 'izdavanje',
    component: IzdavanjeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
