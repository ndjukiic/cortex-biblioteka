import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorListComponent } from './author/author-list.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorEditComponent } from './author/components/author-edit/author-edit.component';
import { AuthorAddComponent } from './author/components/author-add/author-add.component';
import { AuthorDetailComponent } from './author/components/author-detail/author-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AuthorListComponent,
    TransactionsComponent,
    SidebarComponent,
    SettingsComponent,
    AuthorEditComponent,
    AuthorAddComponent,
    AuthorDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
