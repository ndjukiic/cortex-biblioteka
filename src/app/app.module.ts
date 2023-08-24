import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { UceniciListComponent } from './ucenici-list/ucenici-list.component';
import { KnjigeListComponent } from './knjige-list/knjige-list.component';
import { AutoriListComponent } from './autori-list/autori-list.component';
import { IzdavanjeComponent } from './izdavanje/izdavanje.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    UceniciListComponent,
    KnjigeListComponent,
    AutoriListComponent,
    IzdavanjeComponent,
    SidebarComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
